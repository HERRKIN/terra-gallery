import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React from 'react';
import { motion } from 'framer-motion'
export function ConnectSample() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    install,
    disconnect,
  } = useWallet();
console.log({availableConnectTypes})
  return (
    <motion.div 
    key='connect'
    initial={{
      opacity: 0,
      scale: 0.1
    }}
      animate={{ opacity: 1, scale: 1 }} exit={{ scale: 20, opacity: 0 }} style={{ 
        height:'100vh',
        display:'flex',
        justifyContent:'space-around', 
        alignItems: 'center', 
        width:'100%',
        flexDirection: 'column' }}>
      <h1 style={{ fontFamily: 'zen dots', fontSize: '2.2em', }}>TerraGallery</h1>
      <footer style={{display:'flex', flexDirection:'column',   justifyContent:'center', width:'100%', gap:30, padding:30, textAlign:'center', color:'white'}}>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
          Connect
            {availableInstallTypes.map((connectType) => (
              <button
                key={'install-' + connectType}
                onClick={() => install(connectType)}
                style={{display:'flex', justifyContent:'center', alignItems:'center'}}
              >
                Install {connectType}
              </button>
            ))}


            {availableConnections.map(
              ({ type, name, icon, identifier = '' }) => (
                <button
                  key={'connection-' + type + identifier}
                  onClick={() => connect(type, identifier)}
                  style={{        display:'flex', justifyContent:'center', alignItems:'center'}}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: '2em', height: '2em', margin:5,
                    filter: "drop-shadow(0px 1px 0px white)",
                    display:'flex', justifyContent:'center', alignItems:'center'
                  }}
                  />
                   {name} 
                </button>
              ),
            )}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </footer>
    </motion.div >
  );
}
