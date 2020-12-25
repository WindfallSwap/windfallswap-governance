const WFL = artifacts.require("Wfl.sol");
const Timelock = artifacts.require("Timelock.sol");
const GovernorAlpha = artifacts.require("GovernorAlpha.sol");

module.exports = async function (deployer, _network, addresses) {
  const WFL_INIT_ADDRESS = '0x8E9019706Aa2D5f2F6414Ee0A2Dd373B19c9F50f';
  const WFL_MINT_ADDRESS = '0xd3Fa0d0Ce1d28a1b84e40a14005071c4e7064cBf';

  const TIMELOCK_ADMIN_ADDRESS = '0x89B86bEaF97Fa6dDF0fE292A0600053E83f74175';

  let mintingAllowedAfter = +new Date();
  mintingAllowedAfter = parseInt(mintingAllowedAfter/1000) + 5 * 60;
  await deployer.deploy(WFL, WFL_INIT_ADDRESS, WFL_MINT_ADDRESS, mintingAllowedAfter);
  let wfl = await WFL.deployed();

  let timelockDelay = 3 * 24 * 3600 // 3 days
  await deployer.deploy(Timelock, TIMELOCK_ADMIN_ADDRESS, timelockDelay);
  let timelock = await Timelock.deployed();

  await deployer.deploy(GovernorAlpha, timelock.address, wfl.address);
  let governorAlpha = await GovernorAlpha.deployed();
};
