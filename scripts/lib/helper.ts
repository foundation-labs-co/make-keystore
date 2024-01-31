import Web3 from "web3";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWeb3(rpc: string): Web3 {
  return new Web3(rpc);
}

function decryptKeystore(keystore: any, password: string) {
  const web3 = getWeb3("");
  return web3.eth.accounts.wallet.decrypt(keystore, password);
}

function encryptKeystore(privateKey: string, password: string) {
  const web3 = getWeb3("");
  return web3.eth.accounts.encrypt(privateKey, password);
}

export {
  sleep,
  getWeb3,
  decryptKeystore,
  encryptKeystore,
};
