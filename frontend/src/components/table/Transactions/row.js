import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ETHERSCAN_URL } from '../../../config'
import { fetchTransaction, FETCH_TRANSACTION_SUCCESS } from '../../../actions/token/transaction';
import { fetchBlock, FETCH_BLOCK_SUCCESS } from '../../../actions/token/block';

import '../../../style/app.scss';

class TransactionRow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			transaction: {}
		}
	}

	async componentWillMount() {
		const { hash, fetchTransaction, fetchBlock } = this.props
		const action = await fetchTransaction({ hash })
		if (action.type === FETCH_TRANSACTION_SUCCESS) {
			var transaction = action.data
			if (transaction.blockNumber) {
				const blockAction = await fetchBlock({ blockNumber: transaction.blockNumber })

				if (blockAction.type === FETCH_BLOCK_SUCCESS) {
					console.log(blockAction.data)
					const time = new Date(parseInt(blockAction.data.timestamp) * 1000)
					transaction = { ...transaction, time }
				}
			}

			console.log(transaction)
			this.setState({ transaction })
		}
	}

	render() {
		const { transaction } = this.state
		const { value, hash } = this.props
		var isPending = false
		if (!transaction.blockHash)
			isPending = true
		const gasPriceEth = parseFloat(transaction.gasPrice) / 1000000000000000000
		const gasPrice = parseFloat(transaction.gasPrice) / 1000000000
		const ethscanURL = `${ETHERSCAN_URL}tx/${hash}`
		return(
			<tr className="invoice-header">
				<td>
					<a href={ ethscanURL} target="_blank">{ transaction.hash }</a>
				</td>
				<td>
					{ isPending ? "Pending" : "Success"}
				</td>
				<td>
					{ transaction.blockNumber }
				</td>
				<td>
					{ transaction.time ? transaction.time.toString() : "" }
				</td>
				<td>
					{ transaction.from }
				</td>
				<td>
					{ transaction.to }
				</td>
				<td>
					{ value }
				</td>
				<td>
				</td>
				<td>
					{ gasPriceEth } Ether ({ gasPrice } Gwei)
				</td>
			</tr>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { fetchTransaction, fetchBlock })(TransactionRow);
export default withRouter(connectedComponent);