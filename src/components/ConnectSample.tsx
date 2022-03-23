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

  return (
    <motion.div 
    key='connect'
    initial={{
      opacity: 0,
      scale: 0.1
    }}
      animate={{ opacity: 1, scale: 1 }} exit={{ scale: 20, opacity: 0 }} style={{ backgroundColor: 'skyblue', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ fontFamily: 'zen dots', fontSize: 70, }}>TerraGallery.xyz</h1>
      <footer style={{display:'flex', justifyContent:'center', width:'100%', gap:30, padding:30}}>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            {availableInstallTypes.map((connectType) => (
              <button
                key={'install-' + connectType}
                onClick={() => install(connectType)}
              >
                Install {connectType}
              </button>
            ))}


            {availableConnections.map(
              ({ type, name, icon, identifier = '' }) => (
                <button
                  key={'connection-' + type + identifier}
                  onClick={() => connect(type, identifier)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: '1em', height: '1em', margin:5}}
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
