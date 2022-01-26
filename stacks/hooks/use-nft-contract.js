import { NFT_CONTRACT } from "../constent";

export const useNftContract = () => {
    return NFT_CONTRACT.split(".");
}