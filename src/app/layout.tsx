'use client';

import './globals.css';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">
            <body>
                <WagmiConfig config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider>
                            {children}
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiConfig>
            </body>
        </html>
    );
}