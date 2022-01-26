import { StacksMainnet, StacksTestnet } from "@stacks/network"
import { STACKS_API_URL } from "../constent"

export const useNetwork = () => {
    const network = new StacksTestnet({ url: STACKS_API_URL })
    // const network = new StacksMainnet({ url: STACKS_API_URL })
    return network
}
