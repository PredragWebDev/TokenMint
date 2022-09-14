import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, FETCH_TOKEN_SUCCESS } from '../../actions/token/fetch';
import { publishProduct, PUBLISH_PRODUCT_SUCCESS } from '../../actions/opensea/publish'
import { getProduct, GET_PRODUCT_SUCCESS } from '../../actions/product/get';
import { NFT_721_CONTRACT_ADDRESS, NFT_1155_CONTRACT_ADDRESS, ETHERSCAN_URL } from "../../config";
import TransactionTable from '../../components/table/Transactions'

import '../../style/app.scss';

class ProductDetail extends React.Component {
	
	constructor(props) {
		super(props)
		this.publishToMarketPlace = this.publishToMarketPlace.bind(this)

		this.state = {
			product: {},
			token: {}
		}
	}

	async loadProduct(productId) {
		const { getProduct } = this.props
		var action = await getProduct({productId})
		if (action.type === GET_PRODUCT_SUCCESS) {
			return action.data
		} else {
			return undefined
		}
	}

	async componentWillMount() {
		const { match: { params } } = this.props;

		const productId = params.productId

		const { product, fetchToken } = this.props;

		var productObj = undefined
		if (product.data.length) {
			productObj = product.data.map(p => {
				if (p.id === productId)
					return p
			})
		} else {
			 productObj = await this.loadProduct(productId)
		}

		if (!productObj)
			return

		this.setState({
			product: productObj
		})

		const tokenId = productObj.token_id

		const tokenType = productObj.token_type
		const action = await fetchToken({ tokenId, tokenType})

		if (action.type === FETCH_TOKEN_SUCCESS) {
			if (tokenType == 0) {
				this.setState({
					token: {
						id: tokenId,
						name: action.data[0],
						description: action.data[1],
						exturnal_url: action.data[2],
						image: action.data[3],
						tokenType: tokenType
					}
				})
			} else {
				this.setState({
					token: {
						id: tokenId,
						name: action.data[0],
						description: action.data[1],
						exturnal_url: action.data[2],
						image: action.data[3],
						quantity: action.data[4],
						tokenType: tokenType
					}
				})
			}
		}
	}

	publishToMarketPlace(event) {
		const { session, publishProduct } = this.props
		const { product, token } = this.state

		const payload = {
			id: product.id,
			address: session.data.address,
			type: product.token_type,
			quantity: token.quantity
		}
		publishProduct(payload)
		this.props.history.push("/")
	}

	renderOpenseaButton = () => {
		const { token, product } = this.state

		if (product.id && product.status === 'deployed') {
			const contractAddress = product.token_type === 0 ? NFT_721_CONTRACT_ADDRESS : NFT_1155_CONTRACT_ADDRESS
			const url = `https://testnets.opensea.io/assets/${contractAddress}/${product.token_id}`

			return (<Col><a href={url} target="_blank">View on OpenSea</a></Col>)
		}

		return null
	}

	render() {
		var { product, token } = this.state

		const {session} = this.props
		if (!product.id || !token.id)
			return (
				<div className="container">
					<label>No data</label>
					<Link to="/">Back to dashboard</Link>
				</div>)
		return(
				<div className="container">
					<Link to="/">Back to dashboard</Link>
					<Row key={product.id} className="invoice-header">
			          <Col>
			          	<img src={ token.image } className="detail-image" alt='logo' />
			          </Col>
			          <Col>
			          	{ token.name }
			          </Col>
			          <Col>
			          	{ token.description }
			          </Col>
			          <Col>
			          	<a href={ token.exturnal_url }>{ token.exturnal_url }</a>
			          </Col>
			          { session.data.id && session.data.id == product.user_id ? (<Col>
			          	<Button block color="primary" onClick={this.publishToMarketPlace} disabled={ product.status !== 'minted'}>
					        Publish to Opensea
					    </Button>
			          </Col>) : null}
			          {  }
			          {this.renderOpenseaButton()}
			        </Row>
			        <label>
			        	Transactions
			        </label>
			        <TransactionTable token={token}></TransactionTable>
		        </div>
			)
	}
}

const mapStateToProps = ({ session, product }) => ({ session, product });
const connectedComponent = connect(mapStateToProps, { publishProduct, getProduct, fetchToken })(ProductDetail);
export default withRouter(connectedComponent);