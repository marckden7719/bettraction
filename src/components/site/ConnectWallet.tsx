
import { useAuth } from "@/lib/context/AuthContext";
import { useConnect, useAccount, useDisconnect, useSignMessage } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { SiweMessage } from "siwe";
import { getNonce, verifySignature } from "@/lib/api/auth";
import { toast } from "sonner";

export function ConnectWallet() {
  const { login, user } = useAuth();
  const { connect, connectors, status } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [isSigning, setIsSigning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConnect = async () => {
    try {
      // Try injected connector first (MetaMask)
      const connector = connectors.find(c => c.id === "injected") || connectors[0];
      await connect({ connector });
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect wallet");
    }
  };

  const handleSignIn = async () => {
    if (!address || !isClient) return;
    setIsSigning(true);

    try {
      const nonceResponse = await getNonce({ data: { wallet: address } });
      const { nonce } = nonceResponse.data;
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in to BetTraction",
        uri: window.location.origin,
        version: "1",
        chainId: 8453,
        nonce,
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const verifyResponse = await verifySignature({
        data: { message: message.prepareMessage(), signature },
      });
      const { token, user: userData } = verifyResponse.data;

      login(token, userData);
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
    } finally {
      setIsSigning(false);
    }
  };

  if (!isClient) {
    return (
      <Button
        disabled
        className="bg-gradient-primary text-primary-foreground shadow-elegant"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm truncate max-w-[150px]">
          {user.wallet_address.slice(0, 6)}...{user.wallet_address.slice(-4)}
        </span>
        <Button variant="outline" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <Button
        className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95"
        onClick={handleSignIn}
        disabled={isSigning}
      >
        {isSigning ? "Signing..." : "Sign In"}
      </Button>
    );
  }

  return (
    <Button
      className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95"
      onClick={handleConnect}
      disabled={status === "pending"}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {status === "pending" ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
