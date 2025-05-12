import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";

export default function SendSol() {
    const [active, setActive] = useState<boolean>(false);
    const [toId, setToId] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const wallet = useWallet();
    const { connection } = useConnection();

    async function handleSendSol() {
        if (!toId || !amount) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            new PublicKey(toId);
        } catch {
            toast.error("Invalid public key");
            return;
        }

        const lamports = Number(amount) * LAMPORTS_PER_SOL;
        if (isNaN(lamports) || lamports <= 0) {
            toast.error("Invalid amount");
            return;
        }

        if (!wallet.publicKey) {
            toast.error("Wallet not connected");
            return;
        }

        setLoading(true);
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(toId),
                    lamports,
                })
            );

            await wallet.sendTransaction(transaction, connection);
            toast.success(`Successfully sent ${amount} SOL`);

            setToId("");
            setAmount("");
            setActive(false);
        } catch (error) {
            console.error(error);
            toast.error("Transaction failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="absolute top-8 right-8">
            {active ? (
                <div className="p-4 bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg space-y-4 w-72">
                    <h2 className="text-lg text-white font-semibold text-center">Send SOL</h2>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-300">Recipient Address</label>
                        <input
                            value={toId}
                            onChange={(e) => setToId(e.target.value)}
                            type="text"
                            placeholder="Enter address"
                            className="w-full px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-300">Amount (SOL)</label>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            placeholder="e.g. 0.01"
                            className="w-full px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-between gap-2">
                        <button
                            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
                            onClick={() => setActive(false)}
                            type="button"
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            className={`flex-1 px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={handleSendSol}
                            type="button"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition"
                    onClick={() => setActive(true)}
                    type="button"
                >
                    Send SOL
                </button>
            )}
        </div>
    );
}
