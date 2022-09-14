import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams } from 'react-router-dom';
import Router from './routes/Router';
import { Web3ReactProvider } from '@web3-react/core'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { metamaskVerify } from './actions/metamask/verify'
import { fetchProduct } from './actions/product/fetch'

import './style/app.scss';

class App extends React.Component {
  async componentWillMount() {
    // Load user session data from persisted state.
    const { data } = this.props.session;
    if (data.id) {
      this.props.metamaskVerify(data)
    }

    await this.props.fetchProduct();
  }

  getLibrary = (provider) => {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }

  render() {
      const isLoggedIn = this.props.session.data && this.props.session.data.id;
      return (
        <div className="app">
          <Web3ReactProvider getLibrary={this.getLibrary}>
            <Router isAuthenticated={isLoggedIn} />
          </Web3ReactProvider>
        </div>
      );
  }
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { metamaskVerify, fetchProduct })(App);
export default withRouter(connectedComponent);