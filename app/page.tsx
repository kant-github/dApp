'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton, } from '@solana/wallet-adapter-react-ui';
// import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

export default function Home() {
  const [solAmount, setSolAmount] = useState<number>(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  async function handleSendAirdrop() {
    if (!wallet.publicKey) {
      alert("Wallet is misisng");
      return;
    }

    if (solAmount < 0) {
      alert("Please add valid SOL amount");
      return;
    }

    await connection.requestAirdrop(wallet.publicKey, solAmount);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4">
      <section className="flex flex-col items-center gap-4">

        <div className="flex gap-2">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>

        {wallet.publicKey && (
          <p className="text-neutral-100 text-sm">
            Hi <span className="font-mono">{wallet.publicKey.toString()}</span>
          </p>
        )}

        <input onChange={(e) => setSolAmount(Number(e.target.value))} type="text" placeholder="Enter amount in SOL" className="w-64 px-3 py-2 rounded-md border border-neutral-700 bg-transparent text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition" onClick={handleSendAirdrop} type='button'>Request Airdrop</button>

      </section>
    </main>
  );
}
