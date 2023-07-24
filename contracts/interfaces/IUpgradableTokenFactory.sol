// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/**
 * @title Interface to be implemented by upgradable token factories
 */
interface IUpgradableTokenFactory {

  /**
   * @notice Used to upgrade a token
   * @param _maxModuleType maximum module type enumeration
   */
  function upgradeToken(uint8 _maxModuleType) external;

}
