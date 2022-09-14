import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AuthRequiredRoute from '../../auth/AuthRequired';

import Home from '../../pages/Home';
import ProductDetail from '../../pages/ProductDetail'
import WalletLogin from '../../pages/WalletLogin';
import CreateNewProduct from '../../pages/CreateNewProduct';
import CreateSingle from '../../pages/CreateSingle';
import CreateMulti from '../../pages/CreateMulti';
import Notfound from '../../pages/NotFound';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:productId" component={ProductDetail} />
        <Route path="/auth/wallet-begin" component={WalletLogin} />

        <AuthRequiredRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/new/product/single"
          component={CreateSingle}
        />

        <AuthRequiredRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/new/product/multi"
          component={CreateMulti}
        />

        <AuthRequiredRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/new/product"
          component={CreateNewProduct}
        />

        <Route component={Notfound} />
      </Switch>
    );
  }
}

export default Router;