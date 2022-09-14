import React from 'react';
import { Table } from 'reactstrap';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTransaction, FETCH_TRANSACTION_SUCCESS } from '../../../actions/token/transaction';
import { fetchHistory, FETCH_HISTORY_SUCCESS } from '../../../actions/token/history';
import { fetchBlock, FETCH_BLOCK_SUCCESS } from '../../../actions/token/block';
import TransactionRow from './row';

import '../../../style/app.scss';

class TransactionTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			transactions: []
		}
	}

	async componentWillMount() {
		const { token, fetchTransaction, fetchBlock, fetchHistory } = this.props

		const tokenType = token.tokenType
		const tokenId = token.id

		var action = await fetchHistory({tokenType})
			
		if (action.type === "FETCH_HISTORY_SUCCESS") {
			if (action.data.length) {
				var transactions = []
				console.log(action.data)
				action.data.map(t => {
					if (tokenType === 0) {
						if (parseInt(t.returnValues.tokenId) == tokenId)
							transactions.push(t)
					} else {
						if (parseInt(t.returnValues.id) == tokenId)
							transactions.push(t)
					}
				})

				this.setState({ transactions: transactions })
			}
		}
	}

	render() {
		const { transactions } = this.state
		const { fetchTransaction, fetchBlock } = this.props
		const renderHeaders = () => {
			return (
	            <tr>
	              	<th>Transaction Hash</th>
	    			<th>Status</th>
	    			<th>Block</th>
	    			<th>Timestamp</th>
	    			<th>From</th>
	    			<th>To</th>
	    			<th>Quantity</th>
	    			<th>Transaction Fee</th>
	    			<th>Gas Price</th>
	            </tr>
	        );
		}
		const renderTransactionRows = () => transactions.map(transaction => {
			return (<TransactionRow 
				key={transaction.transactionHash} 
				hash={transaction.transactionHash} 
				value={transaction.returnValues.value ? transaction.returnValues.value : 0}></TransactionRow>)
		})
		
		if (!transactions.length)
			return <div>Loading...</div>
		
		return (
				<div className="table-container">
		          <Table responsive className="table">
		            <thead>
		              {renderHeaders()}
		            </thead>
		            <tbody>
		              {renderTransactionRows()}
		            </tbody>
		          </Table>
		        </div>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { fetchTransaction, fetchBlock, fetchHistory })(TransactionTable);
export default withRouter(connectedComponent);