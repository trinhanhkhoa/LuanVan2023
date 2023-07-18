const Web3 = require("web3");
require('dotenv').config();
const EthereumTx = require('ethereumjs-tx').Transaction;

const API_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractAbi = require("./scripts/abi.json");
const addressOwner = "0xf3dE18F17C963484da197Ae1A6ED0a3caCd76646";

const privateKeyBuffer = Buffer.from(PRIVATE_KEY, 'hex')

const express = require('express');
const app = express();
app.use(express.json());

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(API_URL)
);

web3.eth.defaultAccount = addressOwner;

const url = "https://goerli.etherscan.io/tx/";

async function connectWallet() {
    contractInstance = await new web3.eth.Contract(contractAbi.abi, contractAddress);

    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    return contractInstance;
}

let contractInstance = connectWallet();

web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
        console.log(`new block received. Block # ${block.number}`)
    })

app.get('/products/:id', async (req, res) => { //http://localhost:3000/products/1
    try {
        const {pid, uid} = req.body;

        const product = await contractInstance.methods.getProductID(uid, pid).call({
            from: addressOwner,
        })
        res.json({
            success: true,
            product: product,
            // url: re
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/products/', async (req, res) => { //http://localhost:3000/products/
    try {
        console.log("get products")
        const allProducts = await contractInstance.methods.getAllListProducts().call({
            from: addressOwner
        });
        const products = allProducts.map(product => ({
            id: parseInt(product.id),
            tracking: product.trackingList,
        }))
        res.send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/product', async (req, res) => {
    try {
        console.log("post products")
        let re;
        const {pid, uid} = req.body;

        const txCount = await web3.eth.getTransactionCount(addressOwner);

        const product = await contractInstance.methods.createProduct(pid, uid).send({
            from: addressOwner,
            gas: 300000,
            gasLimit: 200000,
            // gasLimit: web3.utils.toHex(200000),
            // gas: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
            nonce:    web3.utils.toHex(txCount),
        })
        .on("receipt", function (receipt) {
            re = url + receipt.transactionHash;
            console.log("id", id);
            console.log(re);
        });

        var tx = new EthereumTx(product, { 'chain': 'ropsten' });
        const privateKey = Buffer.from(PRIVATE_KEY, 'hex');
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // // Broadcast the transaction
        const transaction = await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)
        })

        console.log(transaction);
        res.json({
            success: true,
            // data : product,
            transaction: transaction
        })


    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/products/add-tracking/:id', async (req, res) => {
    try {
        console.log("post tracking");
        const {
            productId,
            name
        } = req.body;
        const {
            id
        } = req.params.id;
        const tracking = await contractInstance.methods.addTracking(productId, id, name).send({
            from: addressOwner,
            gas: 300000
        }).on("receipt", function (receipt) {
            re = url + receipt.transactionHash;
        });
        res.json({
            success: true,
            url: re
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/products/tracking', async (req, res) => {
    try {
        console.log("get trackings")
        const allTrackings = await contractInstance.methods.getTrackingList().call({
            from: addressOwner
        });
        const trackings = allTrackings.map(tracking => ({
            userId: tracking.userId,
            id: tracking.id,
            name: tracking.name
        }))
        res.send(trackings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// app.put('/products/:id', async (req, res) => { //http://localhost:3000/products/1
//     try {
//         const id = req.params.id;
//         const {
//             name,
//             price,
//             quantity
//         } = req.body;
//         const tx = await contractInstance.methods.updateProduct(id, name, price, quantity).send({
//             from: addressOwner,
//             gas: 300000
//         }).on("receipt", function (receipt) {
//             re = url + receipt.transactionHash;
//         });
//         await tx;
//         res.json({
//             success: true,
//             data: tx
//         })
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.delete('/products/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const tx = await contractInstance.deleteProduct(id);
//         await tx.wait();
//         res.json({
//             success: true
//         })
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

const port = 3000;
app.listen(port, () => {
    console.log("API server is listening on port 3000")
})