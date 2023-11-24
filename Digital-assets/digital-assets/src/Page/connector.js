const { ethers } = require("ethers");

const abi = [
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "assetHash",
    "type": "string"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "AssetOwnershipTransferred",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "assetHash",
    "type": "string"
   }
  ],
  "name": "AssetPublished",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "address",
    "name": "owner",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "string",
    "name": "assetHash",
    "type": "string"
   }
  ],
  "name": "AssetRegistered",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "assetHash",
    "type": "string"
   }
  ],
  "name": "AssetUnpublished",
  "type": "event"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "",
    "type": "string"
   }
  ],
  "name": "digitalAssets",
  "outputs": [
   {
    "internalType": "address",
    "name": "owner",
    "type": "address"
   },
   {
    "internalType": "string",
    "name": "assetHash",
    "type": "string"
   },
   {
    "internalType": "bool",
    "name": "isPublished",
    "type": "bool"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_assetHash",
    "type": "string"
   }
  ],
  "name": "publishAsset",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_assetHash",
    "type": "string"
   }
  ],
  "name": "registerAsset",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_assetHash",
    "type": "string"
   },
   {
    "internalType": "address",
    "name": "_newOwner",
    "type": "address"
   }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_assetHash",
    "type": "string"
   }
  ],
  "name": "unpublishAsset",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 }
]

if (!window.ethereum) {
 alert('Meta Mask Not Found')
 window.open("https://metamask.io/download/")
}

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export const address = "0xb2D693Ba54597e6c6E514702909232718B91d89C"

export const contract = new ethers.Contract(address, abi, signer)
