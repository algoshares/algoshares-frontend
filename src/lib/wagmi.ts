import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AlgoShares',
    projectId: 'fa8d6f382c249f37865ec6069266ab4f', // get from https://cloud.walletconnect.com
  chains: [base],
  ssr: true, // enables server-side rendering
});
