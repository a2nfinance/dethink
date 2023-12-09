require("@chainlink/env-enc").config()

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 2

const npmCommand = process.env.npm_lifecycle_event
const isTestEnvironment = npmCommand == "test" || npmCommand == "test:unit"

// Set EVM private key (required)
const PRIVATE_KEY = process.env.PRIVATE_KEY

if (!isTestEnvironment && !PRIVATE_KEY) {
  throw Error("Set the PRIVATE_KEY environment variable with your EVM wallet private key")
}

const networks = {
  fuji: {
    url: process.env.AVALANCHE_FUJI_RPC_URL || "THIS HAS NOT BEEN SET",
    ccipRouter: "0x554472a2720e5e7d5d3c817529aba05eed5f82d8",
    functionRouter: "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
    chainSelector: "14767482510784806043",
    gasPrice: undefined,
    accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    verifyApiKey: "THIS HAS NOT BEEN SET",
    chainId: 43113,
    confirmations: 2 * DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "AVAX",
    linkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    bnmToken: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
    donId: "fun-avalanche-fuji-1",
    explorerUrl: "https://testnet.avascan.info",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc"
  }
}

module.exports = {
  networks,
}