// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalAssetRegistry {
    struct DigitalAsset {
        address owner;
        string assetHash;
        bool isPublished;
    }

    mapping(string => DigitalAsset) public digitalAssets;

    event AssetRegistered(address owner, string assetHash);
    event AssetPublished(string assetHash);
    event AssetUnpublished(string assetHash);
    event AssetOwnershipTransferred(string assetHash, address newOwner);

    modifier onlyOwner(string memory _assetHash) {
        require(digitalAssets[_assetHash].owner == msg.sender, "Only the owner can perform this action");
        _;
    }

    modifier onlyNotPublished(string memory _assetHash) {
        require(!digitalAssets[_assetHash].isPublished, "Asset is already published");
        _;
    }

    function registerAsset(string memory _assetHash) external {
       // require(digitalAssets[_assetHash].owner != address(0), "Asset already registered");
        digitalAssets[_assetHash] = DigitalAsset(msg.sender, _assetHash, false);
        emit AssetRegistered(msg.sender, _assetHash);
    }

    function publishAsset(string memory _assetHash) external onlyOwner(_assetHash) onlyNotPublished(_assetHash) {
        digitalAssets[_assetHash].isPublished = true;
        emit AssetPublished(_assetHash);
    }

    function unpublishAsset(string memory _assetHash) external onlyOwner(_assetHash) {
        digitalAssets[_assetHash].isPublished = false;
        emit AssetUnpublished(_assetHash);
    }

    function transferOwnership(string memory _assetHash, address _newOwner) external onlyOwner(_assetHash) {
        require(_newOwner != address(0), "Invalid new owner address");
        digitalAssets[_assetHash].owner = _newOwner;
        emit AssetOwnershipTransferred(_assetHash, _newOwner);
    }
}