// import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [avalancheFuji],
  [
    publicProvider()
  ]
)

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig config={config}>
    <Component {...pageProps} />
  </WagmiConfig>
}
