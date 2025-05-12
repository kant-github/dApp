import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import { toast } from "sonner";
import bs58 from 'bs58';


export default function SignMessage() {
    const { signMessage, publicKey } = useWallet();
    const [message, setMesasge] = useState<string>("");
    async function signMessageHandler() {
        if (!publicKey) {
            toast.error("Wallet does not exist");
            return;
        }

        if (message.length <= 0) {
            toast.error("Please type in a message");
            return;
        }

        if (!signMessage) {
            toast.error("Wallet does not exist");
            return;
        }

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);
        console.log("encoded message : ", encodedMessage);
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
            throw new Error('Message signature invalid!');
        }

        toast.success("Message signed successfully", {
            description: (
                <button type="button" onClick={() => navigator.clipboard.writeText(bs58.encode(signature))} className="mt-2 break-all text-sm text-neutral-900">
                    {bs58.encode(signature)}
                </button>
            ),
        });


    }

    return (
        <div className="mb-4 flex items-center justify-center gap-x-4">
            <input onChange={(e) => setMesasge(e.target.value)} type="text" placeholder="Enter amount in SOL" className="w-64 px-3 py-2 rounded-md border border-neutral-700 bg-transparent text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition" onClick={signMessageHandler} type='button'>Sign a message</button>
        </div>
    )
}