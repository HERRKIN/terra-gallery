import react, { useEffect } from 'react'
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider'
import { AnimatePresence } from 'framer-motion'

import './App.scss';

import { useSetRecoilState } from 'recoil'
import { connectedWalletAtom, LCDAtom } from 'recoil/state'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'
import React from 'react';
import { ConnectSample as Connect } from 'components/ConnectSample';
import { List } from 'list';
function App() {
    const lcd = useLCDClient()
    const wallet = useConnectedWallet()
    const setWallet = useSetRecoilState(connectedWalletAtom)
    const setLCD = useSetRecoilState(LCDAtom)
    useEffect(() => {
        // console.log({wallet},'connect')
        if (!wallet) { setWallet(undefined) }
        else {
            setWallet(wallet.terraAddress)
            setLCD(lcd)
        }
        return () => {
            // console.log({wallet}, 'return')
        }
    }, [wallet])
    // console.log({wallet})
    //   return (
    //   <AnimatePresence exitBeforeEnter>

    return <div className="App"        >
        {!wallet ? <Connect /> : <List />}
        <div style={{
            height: 20, color: 'white', width: '100%', marginTop:-20,
            position:'fixed', bottom:0
        }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                maxWidth:600, 
                margin:'auto'

            }}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'white', zIndex:1,clipPath: 'polygon(10% 0, 90% 1%, 100% 100%, 0% 100%)',     background: 'transparent',
            background: 'rgba(255, 255, 255, 0.35)',
            boxSadow: 'rgb(0 0 0 / 10%) 0px 4px 30px',
            backdropFilter: 'blur(6.8px)' }}></div>
                <div style={{ height: 50, marginTop: -27, width: 50, background: 'rgba(255,255,255,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, fontWeight: 'bold', fontSize: '2em', zIndex:2,filter: 'drop-shadow(2px 4px 1px black)' }}><FiGithub /></div>
                <div style={{ height: 50, marginTop: -27, width: 50, background: 'rgba(255,255,255,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, fontWeight: 'bold', fontSize: '2em', zIndex:2,filter: 'drop-shadow(2px 4px 1px black)' }}><FiTwitter /></div>
                <div style={{ height: 50, marginTop: -27, width: 50, background: 'rgba(255,255,255,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, fontWeight: 'bold', fontSize: '2em',zIndex:2,filter: 'drop-shadow(2px 4px 1px black)'  }}><FiLinkedin /></div>

            </div>

        </div>
    </div>
    //   </AnimatePresence>
    //   )


}

export default App;
