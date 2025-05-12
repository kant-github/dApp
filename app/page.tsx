'use client';

import AirDrop from "@/src/components/AirDrop";
import Balance from "@/src/components/Balance";
import SendSol from "@/src/components/SendSol";
import SignMessage from "@/src/components/SingMessage";

export default function Home() {
  console.log("rendered");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 relative">
      <SendSol />
      <SignMessage />
      <div className="bg-neutral-900 px-12 py-8 rounded-xl flex flex-col items-center">
        <Balance className="mb-4" />
        <AirDrop />
      </div>
    </main>
  );
}
