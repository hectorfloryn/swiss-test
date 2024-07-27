const { ethers } = require("hardhat");

async function main() {
    const perc721 = await ethers.deployContract("PrivateNFT");
    await perc721.waitForDeployment();

    console.log(`PERC-721 was deployed to ${perc721.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});