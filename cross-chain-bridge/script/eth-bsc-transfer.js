const BridgeEth = artifacts.require('./BridgeEth.sol');

const privKey = 'input send cross-chain tx account‘s private key';

module.exports = async done => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  
  const bridgeEth = await BridgeEth.deployed();
  const amount = 1000;
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await bridgeEth.burn(accounts[0], amount, nonce, signature);
  done();
}