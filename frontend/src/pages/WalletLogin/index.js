import React, { useState } from 'react';
import Web3 from 'web3';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { metamaskLogin, METAMASK_LOGIN_SUCCESS } from '../../actions/metamask/signin'
import { metamaskSignup, METAMASK_SIGNUP_SUCCESS } from '../../actions/metamask/signup'
import { metamaskFetch, METAMASK_FETCH_SUCCESS } from '../../actions/metamask/fetch'
import { metamaskGet, METAMASK_GET_SUCCESS } from '../../actions/metamask/get'

import './index.css'

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

class WalletLogin extends React.Component {

 	handleAuthenticate = async ({
		address,
		signature,
	}) => {
		let payload = { publicAddress: address, signature }
		return await this.props.metamaskLogin(payload)
	}

	handleSignMessage = async ({
		address,
		nonce,
	}) => {
		try {
			const signature = await web3.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				address,
				'' // MetaMask will ignore the password argument here
			);

			return { address, signature };
		} catch (err) {
			console.log(err)
		}
	};

	handleSignup = async (address) => {
		let payload = {
			name: "",
			address,
			nonce: ""
		}
		return await this.props.metamaskSignup(payload)
	}

	handleClick = async () => {
		// Check if MetaMask is installed
		if (!window.ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await window.ethereum.enable();
				web3 = new Web3(window.ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();

		let action = await this.props.metamaskFetch({publicAddress})

		if (action.type === METAMASK_FETCH_SUCCESS) {
			let users = action.data
			let user = undefined
			if (!users.length) {
				var signupAction = await this.handleSignup(publicAddress)
				if (signupAction.type === METAMASK_SIGNUP_SUCCESS) {
					var userId = signupAction.data.result.insertId
					user = {
						id: userId,
						address: publicAddress,
						nonce: "",
						name: ""
					}
				}
			} else {
				user = users[0]
			}
			if (user) {
				var handleSignResult = await this.handleSignMessage(user)
				if (handleSignResult) {
					let loginAction = await this.handleAuthenticate(handleSignResult)
					if (loginAction.type === METAMASK_LOGIN_SUCCESS && loginAction.data) {
						this.props.history.push("/")
					}
				}
			}
		}
	};

	render() {
		return (
			<div>
				<p>
					Please select your login method.
					<br />
					For the purpose of this demo, only MetaMask login is
					implemented.
				</p>
				<button className="Login-button Login-mm" onClick={this.handleClick}>
					{this.props.session.isLoading ? 'Loading...' : 'Login with MetaMask'}
				</button>
			</div>
		);
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { metamaskLogin, metamaskSignup, metamaskFetch, metamaskGet })(WalletLogin);
export default withRouter(connectedComponent);