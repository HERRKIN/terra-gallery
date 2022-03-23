import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectSample } from 'components/ConnectSample';
import { CW20TokensSample } from 'components/CW20TokensSample';
import { NetworkSample } from 'components/NetworkSample';
import { QuerySample } from 'components/QuerySample';
import { SignBytesSample } from 'components/SignBytesSample';
import { SignSample } from 'components/SignSample';
import { TxSample } from 'components/TxSample';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from 'App'
import { RecoilRoot } from 'recoil'

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <RecoilRoot >
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>
    </RecoilRoot >,
    document.getElementById('root'),
  );
});
