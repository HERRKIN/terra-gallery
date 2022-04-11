import { connectedWalletAtom, contractsSelector, myNFTsSelector, nftAmountAtom, nftAmountSelector, nftDataSelector, selectedContractAtom } from './recoil/state'
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { ConnectSample } from 'components/ConnectSample';
import { CW20TokensSample } from 'components/CW20TokensSample';
import { NetworkSample } from 'components/NetworkSample';
import { QuerySample } from 'components/QuerySample';
import { SignBytesSample } from 'components/SignBytesSample';
import { SignSample } from 'components/SignSample';
import { TxSample } from 'components/TxSample';
import { useEffect } from 'react';
import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import { IoIosArrowBack } from 'react-icons/io'
// import { useWallet } from '@terra-money/wallet-provider';


export const List = () => {
    const { disconnect } = useWallet()
    const contracts = useRecoilValueLoadable(contractsSelector)
    const [contract, setContract] = useRecoilState(selectedContractAtom)
    if (contracts.state === 'loading') return <div>loading...</div>
    // if (nfts.state === 'loading') return <div>loading nfts</div>
    return <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key='main' exit={{ opacity: 0 }} style={{
        width: '100%',
        // overflowY:'scroll'
    }}>
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
        }}>
            {contract && <h4 onClick={() => setContract(undefined)} style={{ color: 'white', cursor: 'pointer', fontSize: '2em' }}> <IoIosArrowBack /> </h4>}
            <h1 style={{ fontFamily: 'zen dots', margin: 'auto' }}>TerraGallery </h1>
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
        <div style={{ width: '100%', height: "calc(100vh - 58px)", overflowY: 'scroll', paddingBottom:100 }}>
            <AnimatePresence exitBeforeEnter >

                {!contract ? <ProjectList contracts={contracts} /> :
                    <motion.section initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: 100 }} style={{
                        display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', width: '100%',
                        height: '100%'
                    }}>
                        <ListDetail />
                    </motion.section>}
            </AnimatePresence>

        </div>
    </motion.div >
}


const ProjectList = ({ contracts }) => {
    const nftAmount = useRecoilValue(nftAmountAtom)

    return <motion.aside style={{ width: '100%', height: 'auto%', display: 'flex', gap: 10, flexWrap: 'wrap', paddingBottom: 100, justifyContent: "center" }}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
    >
        <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, width: '100%' }}> you own <h1 style={{ padding: 10 }}>
            {Object.keys(nftAmount).reduce((pre, curr) => pre + nftAmount[curr], 0)}
        </h1> nfts accross <h1 style={{ padding: 10 }}>
                {Object.keys(nftAmount).length}
            </h1> projects
        </div>
        {contracts.contents.map(c => <ListItem contract={c} key={c.contract} />)}
    </motion.aside>
}


const ListItem = ({ contract }) => {
    const nfts = useRecoilValueLoadable(myNFTsSelector(contract.contract))
    const setSelectedContract = useSetRecoilState(selectedContractAtom)
    const [nftAmount, setNftAmount] = useRecoilState(nftAmountAtom)
    useEffect(() => {
        if (nfts.state === 'hasValue' && nfts.contents) {
            setNftAmount({ ...nftAmount, [contract.contract]: nfts.contents.length })
        }
    }, [nfts.contents])

    if (nfts.state === 'loading') return <></>

    if (!nfts.contents) return <></>

    return nfts.contents && nfts.contents.length > 0 ? <button className='project' key={contract.contract} onClick={() => setSelectedContract(contract)}>
        <div>
            <img src={contract.icon || 'terra-gallery/no-icon.png'} style={{ width: '100%', aspectRatio: '1/1' }} />

            <h3>{contract.name}</h3>

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


    if (nfts.state === 'loading') return <>loading my nfts</>
    // if (nftAmount.state === 'loading') return <>loading all nfts</>
    if (nfts.state === 'hasError') return <></>
    if (!contract.contents) return <div>select from the left the project you would like to see</div>

    return nfts.contents.map(nft => <NFTItem token={nft} />)

}

const NFTItem = ({ token }) => {
    const nftData = useRecoilValueLoadable(nftDataSelector(token))
    if (nftData.state === 'loading') return <div>loading nft..</div>
    // console.log(nftData.contents)
    return <div style={{
        maxWidth: "47%", width: "100%",
        backgroundImage: nftData.contents.info.extension ? `url(https://cloudflare-ipfs.com/${nftData.contents.info.extension.image.split('ipfs:/').join('ipfs')})` : 'none',
        backgroundSize: 'cover',
        borderRadius: 16
    }}>
        {!nftData.contents.info.extension && <div style={{
            width: '100%',
            aspectRatio: '1/1',
            display: 'flex',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 16,
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold'

        }}>{nftData.contents.info.image || 'no image for this nft'}</div>}




    </div>
}