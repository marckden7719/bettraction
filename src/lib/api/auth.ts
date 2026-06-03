
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateNonce, SiweMessage } from "siwe";
import { SignJWT } from "jose";

const NonceInputSchema = z.object({
  wallet: z.string(),
});

const VerifyInputSchema = z.object({
  message: z.string(),
  signature: z.string(),
});

type User = {
  id: number;
  wallet_address: string;
  created_at: string;
  is_admin: number;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

const loadServerDeps = async () => {
  const { getServerConfig } = await import("../config.server");
  const { getDb, initDb } = await import("../db");
  initDb();
  const db = getDb();
  return { getServerConfig, db };
};

export const getNonce = createServerFn({ method: "POST" })
  .inputValidator(NonceInputSchema)
  .handler(async ({ data }) => {
    const { db } = await loadServerDeps();
    const nonce = generateNonce();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    db.prepare(
      "INSERT INTO nonces (wallet_address, nonce, expires_at) VALUES (?, ?, ?)"
    ).run(data.wallet, nonce, expiresAt.toISOString());

    return { success: true, data: { nonce } };
  });

export const verifySignature = createServerFn({ method: "POST" })
  .inputValidator(VerifyInputSchema)
  .handler(async ({ data }) => {
    const { getServerConfig, db } = await loadServerDeps();
    const config = getServerConfig();
    const siweMessage = new SiweMessage(data.message);

    try {
      const verifyResult = await siweMessage.verify({ signature: data.signature });
      if (!verifyResult.success) throw new Error("Verification failed");

      const nonceRecord = db
        .prepare("SELECT * FROM nonces WHERE nonce = ? AND wallet_address = ?")
        .get(verifyResult.data?.nonce, verifyResult.data?.address) as any;

      if (!nonceRecord) throw new Error("Invalid nonce");
      if (new Date(nonceRecord.expires_at) < new Date())
        throw new Error("Nonce expired");

      let user = db
        .prepare("SELECT * FROM users WHERE wallet_address = ?")
        .get(verifyResult.data?.address) as User | undefined;

      if (!user) {
        const insertResult = db
          .prepare("INSERT INTO users (wallet_address) VALUES (?)")
          .run(verifyResult.data?.address);
        user = db
          .prepare("SELECT * FROM users WHERE id = ?")
          .get(insertResult.lastInsertRowid) as User;
      }

      const secret = new TextEncoder().encode(config.jwtSecret);
      const token = await new SignJWT({
        wallet: user.wallet_address,
        userId: user.id,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);

      return { success: true, data: { token, user } };
    } catch (error) {
      console.error(error);
      throw new Error("Signature verification failed");
    }
  });

export const getSession = createServerFn({ method: "GET" })
  .handler(async () => {
    return { success: true, data: null };
  });
