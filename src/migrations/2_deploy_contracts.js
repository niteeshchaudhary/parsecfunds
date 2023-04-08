const Event = artifacts.require("Event");
const funds = artifacts.require("funds");

module.exports = function (deployer) {
  deployer.deploy(Event);
  deployer.link(Event, funds);
  deployer.deploy(funds);
};
