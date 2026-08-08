const walletValidators = {
  erc20: /^0x[a-fA-F0-9]{40}$/,
  bep20: /^0x[a-fA-F0-9]{40}$/,
  polygon: /^0x[a-fA-F0-9]{40}$/,
  avalanche: /^0x[a-fA-F0-9]{40}$/,
  trc20: /^T[A-Za-z1-9]{33}$/,
  solana: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  ton: /^(EQ|UQ)[A-Za-z0-9_-]{46,48}$/,
};

export const validateWalletAddress = (network, address) => {

  if (!network?.trim()) {
    return "Network is required.";
  }
  
  if (!address?.trim()) {
    return "Wallet address is required.";
  }

  const validator = walletValidators[network.toLowerCase()];

  if (!validator) {
    return "Unsupported network.";
  }

  if (!validator.test(address.trim())) {
    return `Please enter a valid ${network.toUpperCase()} wallet address.`;
  }

  return null;
};