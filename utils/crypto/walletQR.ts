
export const usdtNetworkURIMap = {
  erc20: (address: string) => `ethereum:${address}`,
  bep20: (address: string) => `ethereum:${address}`,
  trc20: (address: string) => `tron:${address}`,
  solana: (address: string) => `solana:${address}`,
  ton: (address: string) => `ton:${address}`,
  polygon: (address: string) => `ethereum:${address}`,
  avalanche: (address: string) => `ethereum:${address}`,
};


export function generateWalletQR(
  network: string,
  walletAddress: string
) {
  const generator =
    usdtNetworkURIMap[network as keyof typeof usdtNetworkURIMap];

  if (!generator) {
    return walletAddress || "";
  }

  return generator(walletAddress);
}