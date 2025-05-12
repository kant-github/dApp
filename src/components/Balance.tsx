import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

interface BalanceProps {
    className?: string
}

export default function Balance({ className }: BalanceProps) {
    const [balance, setBalance] = useState<number | undefined>();
    const wallet = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        if (wallet.publicKey) {
            const publicKey = wallet.publicKey;
            async function getBalance() {
                const data = await connection.getBalance(publicKey);
                setBalance(data / LAMPORTS_PER_SOL);
            }
            getBalance();
        }
    }, [wallet.publicKey, connection]);

    return (
        <div className={`text-white ${className}`}>
            {balance !== undefined ? `Current Balance : ${balance} SOL` : "Loading..."}
        </div>
    );
}
