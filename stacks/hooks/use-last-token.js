
import { useCallback, useEffect, useState, useRef } from "react";
import { useSmartContractApi } from './user-smart-contract-api'
import { useNftContract } from './use-nft-contract'
import { cvToJSON, hexToCV } from '@stacks/transactions'


export const UseLastToken = () => {
    const client = useSmartContractApi();
    const [contractAddress, contractName] = useNftContract();
    const [message, setMessage] = useState(0)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const getLastToken = useCallback(async () => {

        const request = {
            contractAddress,
            contractName,
            functionName: "get-last-token-id",
            readOnlyFunctionArgs: {
                arguments: [],
                sender: contractAddress,
            }
        }
        client.callReadOnlyFunction(request)
            .then(res => {
                setError("")
                if (res.okay && res.result) {
                    let json = cvToJSON(hexToCV(res.result))
                    let mesg = json.value.value;
                    setMessage(mesg)
                }

                setLoading(false)

            }).catch(error => {
                setLoading(false);
                setError(error.message);
            })


    }, [contractAddress, contractName, client])


    useEffect(() => {
        if (message === 0) {
            getLastToken()
        }
    }, [])

    return [message, loading, error]

}