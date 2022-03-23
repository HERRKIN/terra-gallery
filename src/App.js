import react, { useEffect } from 'react'
import {useConnectedWallet, useLCDClient} from '@terra-money/wallet-provider'
import {AnimatePresence} from 'framer-motion'

import './App.scss';

import { useSetRecoilState } from 'recoil'
import { connectedWalletAtom, LCDAtom } from 'recoil/state'

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
      if(!wallet) {setWallet(undefined)}
      else{
          setWallet(wallet.terraAddress)
          setLCD(lcd)
      }
      return () => {
          // console.log({wallet}, 'return')
      }
  },[wallet])
  // console.log({wallet})
//   return (
//   <AnimatePresence exitBeforeEnter>

    return  !wallet ?<Connect />: <List/>
//   </AnimatePresence>
//   )

  
}

export default App;
