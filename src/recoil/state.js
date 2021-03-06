import { selector, atom, selectorFamily, waitForAll } from 'recoil'
import knowhereData from './knowhere.json'
import REData from './re.json'


export const contractsSelector = selector(
    {
        key: 'contractsSelector',
        get: async () => {

            // const response = await fetch('https://knowhere-backend-production-mainnet-mrdovmzsqa-as.a.run.app/collections?limit=500&offset=0')
            // const data = await response.json()
            // console.log({knowhereData})
            const nwd = knowhereData.nodes.map(d => ({contract: d.nftContract, name: d.name, icon:d.imageUrl, description:d.description})).sort((a, b) => a.name - b.name)
            const red = REData.collections.map(d => ({contract:d.addr, name:d.name, description:d.description,icon:d.src}))
            const allData = [...nwd, ...red]
            .filter((v,i,a)=>a.findIndex(t=>(t.contract===v.contract))===i && v.contract.length===44).sort((a, b) => a.name - b.name)
            // console.log({allData})
            return allData

            // const response = await fetch(
            //     "https://raw.githubusercontent.com/terra-money/assets/master/cw721/contracts.js"
            // );
            // const r = await response.text();
            // const data = eval(r);
            // console.log(data.mainnet)
            // const projects = Object.keys(data.mainnet).map(p => data.mainnet[p])
            // console.log({ projects })
            // return projects.sort((a, b) => a.name - b.name)

        }

    }
)
// export const myNFTsDetailsSelector = selector(
//     {
//         key: 'myNFTsDetailsSelector',
//         get:  ({ get }) => {
//             const contract = get(selectedContractAtom)
//             if(!contract) return []
//             console.log({contract})
//             const nftIds = get(myNFTsSelector(contract.contract))
//             console.log({nftIds})
//             // const lcd = get(LCDAtom)
//             // const wallet = get(connectedWalletAtom)
//             const results = await getAllRecursive(lcd.wasm, contract.contract, { "nft_info": {  } }, '')
//             return []
//         }

//     }
// )

export const myNFTsSelector = selectorFamily(
    {
        key: 'myNFTsSelector',
        get: contract => async ({ get }) => {
            if(!contract) return []
            const lcd = get(LCDAtom)
            const wallet = get(connectedWalletAtom)
            try{

                if(["terra10t4pgfs6s3qeykqgfq9r74s89jmu7zx5gfkga5"].includes(contract )){

                    const results = await lcd.wasm.contractQuery(contract, {  "staked_by_addr":{ "address": wallet, "limit": 30} }) 
                    console.log({results})
                    return results.map(item => item.stake)
                }
                const results = await getAllRecursive(lcd.wasm, contract, { "tokens": { "owner": wallet, "limit": 30 } }, '') 
                return results.tokens
            }catch(e){
                console.log(e, contract)
            }
        }

    }
)
export const nftDataSelector = selectorFamily(
    {
        key: 'nftDataSelector',
        get: token => async ({ get }) => {
            const id = token.token_id ? token.token_id : token
            const lcd = get(LCDAtom)
            const contract = get(selectedContractAtom)
            const results = await lcd.wasm.contractQuery(contract.contract, { all_nft_info: { token_id:id } })

            return results
        }

    }
)

export const connectedWalletAtom = atom({
    key: 'connectedWalletAtom',
    default: undefined
})
export const LCDAtom = atom({
    key: 'LCDAtom',
    default: undefined
})
export const selectedContractAtom = atom({
    key: 'selectedContractAtom',
    default: undefined
})
export const nftAmountAtom = atom({
    key: 'nftAmountAtom',
    default:{}
})

const getTokens = (data, contract) => {
    if(data.ids) return data.ids
    if(data.tokens) return data.tokens 
    if(["terra10t4pgfs6s3qeykqgfq9r74s89jmu7zx5gfkga5"].includes(contract)){
        console.log('galactic freeze')
        return data.map(item => stake.token_id )
    }
}

async function getAllRecursive(wasm, contract, query, after) {
    const afterValue = after.length>0 ?{start_after:after}:{};
        const  result  = await wasm.contractQuery(contract, { tokens: { ...query.tokens, ...afterValue } })
        if(!result) return []
        const tokens = getTokens(result, contract)

        if (!tokens || tokens.length === 0) {
            return []
        }
        const newAfter = tokens[tokens.length - 1]
        
        const nextResults = await getAllRecursive(wasm, contract, query, typeof newAfter ==="string" ? newAfter : newAfter.token_id)
        
        return {
            tokens: [
                ...tokens,
                ...(nextResults.tokens || [])
            ]
        }

}
