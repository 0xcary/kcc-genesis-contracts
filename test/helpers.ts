import { network , ethers} from "hardhat";
import { BigNumber,BigNumberish } from "ethers"



// Change the miner of the next block 
export async function setCoinbase(miner:string){
   await network.provider.send("hardhat_setCoinbase",[miner]);
}

// Disable auto mining 
export async function disableAutoMine(){
    await network.provider.send("evm_setAutomine", [false]);
    await network.provider.send("evm_setIntervalMining", [0]);
}

// mine block 
// @param n is number of blocks to mine 
// @return last block number
export async function mineBlocks(n:number){
    await network.provider.send("hardhat_mine", 
    [
        ethers.utils.hexValue(n),
        ethers.utils.hexValue(3) //  the block interval is 3 seconds 
    ]);
    return ethers.provider.getBlockNumber();
}


export async function getLastBlockInfo(){
    const {number, timestamp} = await ethers.provider.getBlock("latest");
    return {number,timestamp};
}


export async function setBalance(address:string, value:BigNumber){
    await network.provider.send("hardhat_setBalance",
    [
        address,
        ethers.utils.hexStripZeros(value.toHexString())
    ]);
}