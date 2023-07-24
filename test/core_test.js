const PolymathRegistry = artifacts.require("./PolymathRegistry.sol");
const PolyTokenFaucet = artifacts.require("./mocks/PolyTokenFaucet.sol");
const TokenLib = artifacts.require("./libraries/TokenLib.sol");
const SecurityTokenLogic = artifacts.require("./tokens/SecurityToken.sol");

contract("test1", (accounts) => {
  // setAccounts
  const account_polymath = accounts[0];
  const account_issuer = accounts[1];
  const account_investor1 = accounts[3];
  const account_investor2 = accounts[2];
  const account_fundsReceiver = accounts[4];
  const account_delegate = accounts[5];
  const token_owner = account_issuer;

  let polymathRegistryInstance;
  let I_PolyToken;
  let tokenLibInstance;

  describe("registry contract deploy", async () => {
    it("deploy PolymathRegistry", async () => {
      polymathRegistryInstance = await PolymathRegistry.new({
        from: account_polymath,
      });

      console.log(polymathRegistryInstance.address);

      I_PolyToken = await PolyTokenFaucet.new({ from: account_polymath });

      await polymathRegistryInstance.changeAddress(
        "PolyToken",
        I_PolyToken.address,
        {
          from: account_polymath,
        }
      );

      const polyAddressOnChain = await polymathRegistryInstance.getAddress.call(
        "PolyToken"
      );

      assert.equal(
        polyAddressOnChain,
        I_PolyToken.address,
        "PolyToken 컨트랙트 주소 등록 실패"
      );
    });

    it("deploy token library and link to Contracts", async () => {
      tokenLibInstance = await TokenLib.new({
        from: account_polymath,
      });

      console.log(tokenLibInstance.address);

      await SecurityTokenLogic.link(tokenLibInstance, tokenLibInstance.address);
      const securityTokenLogicInstance = await SecurityTokenLogic.new({
        from: account_polymath,
      });

      deployer.link(TokenLib, SecurityTokenLogic);
      deployer.link(TokenLib, MockSecurityTokenLogic);
      deployer.link(TokenLib, STFactory);
      deployer.link(TokenLib, STGetter);
      deployer.link(TokenLib, MockSTGetter);
    });
  });
});
