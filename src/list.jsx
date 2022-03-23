import { connectedWalletAtom, contractsSelector, myNFTsSelector, nftAmountSelector, nftDataSelector, selectedContractAtom } from './recoil/state'
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { ConnectSample } from 'components/ConnectSample';
import { CW20TokensSample } from 'components/CW20TokensSample';
import { NetworkSample } from 'components/NetworkSample';
import { QuerySample } from 'components/QuerySample';
import { SignBytesSample } from 'components/SignBytesSample';
import { SignSample } from 'components/SignSample';
import { TxSample } from 'components/TxSample';
import { useEffect } from 'react';
import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import {motion} from 'framer-motion'
// import { useWallet } from '@terra-money/wallet-provider';


export const List = () => {
    const { disconnect } = useWallet()
    const contracts = useRecoilValueLoadable(contractsSelector)
    const wallet = useRecoilValue(connectedWalletAtom)


    // console.log({ wallet })
    if (contracts.state === 'loading') return <div>loading...</div>
    // if (nfts.state === 'loading') return <div>loading nfts</div>
    return<motion.div initial={{y:100, opacity:0}} animate={{y:0, opacity:1}} key='main' exit={{ opacity:0}}>
        <div style={{ width: '100%', background:'skyblue', display:'flex', justifyContent:'space-between', alignItems:'center', padding:10, boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;` }}>
            <h1 style={{fontFamily:'zen dots'}}>TerraGallery.xyz</h1>
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
        <div className="App">

            <aside>
                {contracts.contents.map(c => <ListItem contract={c} key={c.contract} />)}
            </aside>
            <section>
                <ListDetail />
            </section>
        </div>
    </motion.div >
}

const ListItem = ({ contract }) => {
    const nfts = useRecoilValueLoadable(myNFTsSelector(contract.contract))
    const setSelectedContract = useSetRecoilState(selectedContractAtom)
    useEffect(() => {
        console.log(nfts.contents)

    }, [nfts.contents])
    if (nfts.state === 'loading') return <></>
    // console.log(contract)
    // if(nfts.contents.length === 0 ) return <></>

    return nfts.contents && nfts.contents.length > 0 ? <button className='project' key={contract.contract} onClick={() => setSelectedContract(contract)}>
        <div>
            <img src={contract.icon} style={{ maxWidth: 100, maxHeight: 100, minHeight: 90 }} />
            <div>
                <h3>{contract.name}</h3>
            </div>
            <div className='nftCount'>
                {nfts.contents.length}
            </div>
        </div>
    </button> : <></>
}

const ListDetail = () => {
    // const nftAmount = useRecoilValueLoadable(nftAmountSelector)
    const contract = useRecoilValueLoadable(selectedContractAtom)
    const nfts = useRecoilValueLoadable(myNFTsSelector(contract.contents ? contract.contents.contract : ''))

    // console.log({ nfts, nftAmount })
    if (nfts.state === 'loading') return <></>
    // if (nftAmount.state === 'loading') return <></>
    if (!contract.contents) return <div> you own  nfts, please select from the left the project you would like to see</div>
    return nfts.contents.map(nft => <NFTItem token={nft} />)

}

const NFTItem = ({ token }) => {
    const nftData = useRecoilValueLoadable(nftDataSelector(token))
    if(nftData.state === 'loading')return <div>loading nft..</div>
    console.log(nftData.contents)
    return <div style={{ maxWidth: 300 }}>
        {!nftData.contents.info.extension ? <div style={{width:'100%'}}>{nftData.contents.info.image|| 'no image for this nft' }</div> :
            <img style={{ width: '100%' }} src={`https://cloudflare-ipfs.com/${nftData.contents.info.extension.image.split('ipfs:/').join('ipfs')}`} />
        }
    </div>
}