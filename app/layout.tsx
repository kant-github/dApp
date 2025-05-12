'use client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './globals.css';
import { Toaster } from 'sonner';
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>

        <ConnectionProvider endpoint={'https://snowy-wandering-bush.solana-devnet.quiknode.pro/bc8d9e83b5405544abfd5f2cb78f8a36b7c29abd/'}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <Toaster />
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
