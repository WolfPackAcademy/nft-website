
import { useCallback, useEffect, useState } from "react";
import {
    makeStandardSTXPostCondition,
    makeContractSTXPostCondition,
    FungibleConditionCode,
} from "@stacks/transactions"
import { useNftContract } from './use-nft-contract'
import { useNetwork } from './use-network'
import { useConnect } from '@stacks/connect-react'
import { userSession } from "../logic/auth";


export default function UseClaim() {
    const [contractAddress, contractName] = useNftContract();
    const network = useNetwork();
    const { doContractCall } = useConnect();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);


    const ClaimNft = useCallback(() => {

        doContractCall({
            contractAddress: contractAddress,
            contractName: contractName,
            functionName: "claim",
            functionArgs: [],
            senderKey: userData.appPrivateKey,
            validateWithAbi: true,
            network,
            onFinish: (data) => {
                console.log(data)
            },
            postConditions: [
                makeStandardSTXPostCondition(userData.profile.stxAddress.mainnet,
                    FungibleConditionCode.LessEqual,
                    1000000),
                makeContractSTXPostCondition(contractAddress,
                    contractName,
                    FungibleConditionCode.LessEqual,
                    1000000)
            ]

        })

    }, [contractAddress, contractName, network, userData])



    return (<button className="btn btn-info" onClick={ClaimNft}>
        Mint
    </button>)



}