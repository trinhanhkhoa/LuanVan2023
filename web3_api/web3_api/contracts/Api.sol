// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Api {
    struct Tracking {
        string uid;
        string id;
        string name;
        string pid;
    }

    struct Product {
        string pid;
        Tracking[] trackingList;
    }

    struct AllProducts {
        string id;
        string uid;
    }

    AllProducts[] getAllProducts;

    address owner;

    mapping(string => Product) productList;
    mapping(string => Tracking[]) allTracking;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // function checkProductExists(string memory pid) public view returns(bool) {
    //     return keccak256(abi.encodePacked(productList[msg.sender].pid)) == keccak256(abi.encodePacked(pid));
    // }

    function createProduct(string calldata pid, string calldata uid) external {
        // require(checkProductExists(pid) == false, "Product is already existed");
        // require(bytes(pid).length > 0, "Product id cannot be empty");
        productList[uid].pid = pid;

        getAllProducts.push(AllProducts(pid, uid));
    }

    function getProductID(string calldata uid, string memory pid) external view returns (Product memory) {
        // require(checkProductExists(pid) == false, "Product is not created");
        return productList[uid];
    }

    // function getProductID(address userId) external view returns (string memory) {
    //     // require(checkProductExists(msg.sender), "Product is existed");
    //     return productList[userId].id;
    // }

    function addTracking(string memory pid, string calldata uid, string calldata id, string calldata name) external onlyOwner  {
        // require(checkProductExists(pid), "Create product first");
        // require(checkTrackingExists(trackingId, msg.sender), "Tracking is not created");@
        // require(trackingId != msg.sender, "Product can not add itself");

        // _addTracking(msg.sender, productId, id, name);
        _addTracking(uid, productList[uid].pid, name, id);
    }

    function _addTracking(string memory userId, string memory pid, string memory name, string memory id) internal onlyOwner  {
        Tracking memory newTracking = Tracking(userId, id, name, pid);
        productList[userId].trackingList.push(newTracking);
    }

    function getTrackingList(string calldata uid) external view returns(Tracking[] memory) {
        return productList[uid].trackingList;
    }

    function getAllListProducts() public view returns(AllProducts[] memory) {
        return getAllProducts;
    }
    // function checkTrackingExists(address id1, address id2) internal view returns (bool){
    //     if(productList[id1].trackingList.length > productList[id2].trackingList.length)
    //     {
    //         address tmp = id1;
    //         id1 = id2;
    //         id2 = tmp;
    //     }

    //     for(uint i = 0; i < productList[id1].trackingList.length; i++)
    //         if(productList[id1].trackingList.id = id2) return true

    //     return false;
    // }
}