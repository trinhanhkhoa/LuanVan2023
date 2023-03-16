// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Store {
    struct InfoItem {
        address owner;
        string name;
        uint id;
        string description;
        uint timestamp;
        string image;
        string itemAddress;
    }

    uint public totalItems;

    mapping(uint => InfoItem) items;
    mapping(address => InfoItem[]) itemsOf;
    
    constructor() { }

    function createItem(address _owner, string memory _name, string memory _itemAdress, string memory _description, string memory _image) public returns (uint256) {
        uint itemId = totalItems;

        InfoItem storage item = items[itemId];

        item.owner = _owner;
        item.name = _name;
        item.id = itemId;
        item.itemAddress = _itemAdress;
        item.timestamp = block.timestamp;
        item.image = _image;
        item.description = _description;
        itemsOf[msg.sender].push(item);
        totalItems++;

        return totalItems - 1;
    }

    function getItem(uint itemId) public view returns (InfoItem memory ) {
        return items[itemId];
    }

    function getItems() public view returns (InfoItem[] memory) {
        InfoItem[] memory props = new InfoItem[](totalItems);

        for(uint i = 0; i < totalItems; i++){
            props[i] = items[i];
        }

        return props;
    }
}