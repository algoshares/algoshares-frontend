import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AlgoShares',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // get from https://cloud.walletconnect.com
  chains: [base, baseSepolia],
  ssr: true, // enables server-side rendering
});
