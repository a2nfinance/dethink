import { ethers } from "ethers";
import generateAttributesABI from "@/abis/attributesFunctionsConsumer.json";
import generateImagesABI from "@/abis/imagesFunctionsConsumer.json";
const attContractAddress = process.env.NEXT_PUBLIC_ATTRIBUTES_CONTRACT;
const imageContractAddress = process.env.NEXT_PUBLIC_IMAGE_CONTRACT;
const provider = new ethers.WebSocketProvider(
    `wss://api.avax-test.network/ext/bc/C/ws`,
    43113
);

export const attributeContract = new ethers.Contract(attContractAddress, generateAttributesABI, provider);
export const imagesContract = new ethers.Contract(imageContractAddress, generateImagesABI, provider);
export const getGenerateAttConfig = (prompt: string, chainId: number) => {
    
    return {
        address: attContractAddress,
        abi: generateAttributesABI,
        functionName: 'getAttribute',
        args: [
           prompt
        ]
    }
}

export const getGenerateImageConfig = (prompt: string, size: string, chainId: number) => {
    
    return {
        address: imageContractAddress,
        abi: generateImagesABI,
        functionName: 'getAttribute',
        args: [
           prompt,
           size
        ]
    }
}