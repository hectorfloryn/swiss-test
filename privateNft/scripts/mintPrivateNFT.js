//const hre = require("hardhat");
const {
    ethers,
    network,
} = require("hardhat");

//const HttpNetworkConfig = require("hardhat/types");

const {
    encryptDataField,
    decryptNodeResponse,
} = require("@swisstronik/utils");


const sendShieldedTransaction = async (signer, destination, data, value) => {

    const rpcLink = network.config.url;

    const [encryptedData] = await encryptDataField(rpcLink, data);

    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {

    const contractAddress = "0x2D6e98880e0e6878CD4BdE9E12E4fa4Bf12A71e3";

    const [signer] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("PrivateNFT");
    const contract = contractFactory.attach(contractAddress);

    const functionName = "mintNFT";
    const recipientAddress = signer.address;
    const mintToken = await sendShieldedTransaction(
        signer,
        contractAddress,
        contract.interface.encodeFunctionData(functionName, [recipientAddress]),
        0
    );

    await mintToken.wait();

    console.log("Mint Transaction Hash: ", mintToken.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});