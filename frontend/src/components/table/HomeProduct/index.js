import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, FETCH_TOKEN_SUCCESS } from '../../../actions/token/fetch';
import { publishProduct, PUBLISH_PRODUCT_SUCCESS } from '../../../actions/opensea/publish'
import { NFT_721_CONTRACT_ADDRESS, NFT_1155_CONTRACT_ADDRESS } from "../../../config"

import '../../../style/app.scss';

class HomeProduct extends React.Component {

	constructor(props) {
		super(props)
		this.publishToMarketPlace = this.publishToMarketPlace.bind(this)

		this.state = {
			token: {}
		}
	}

	async componentWillMount() {
		const { product, fetchToken } = this.props;

		const tokenId = product.token_id
		const tokenType = product.token_type

		const action = await fetchToken({ tokenId, tokenType})

		if (action.type === FETCH_TOKEN_SUCCESS) {
			if (tokenType === 0) {
				this.setState({
					token: {
						id: tokenId,
						name: action.data[0],
						description: action.data[1],
						exturnal_url: action.data[2],
						image: action.data[3]
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
						quantity: action.data[4]
					}
				})
			}
		}
	}
	
	publishToMarketPlace(event) {
		const { product, session, publishProduct } = this.props
		const payload = {
			id: product.id,
			address: session.data.address,
			type: product.token_type
		}
		publishProduct(payload)
	}

	renderOpenseaButton = () => {
		const { product, session } = this.props
		const { token } = this.state

		if (product.status === 'deployed') {
			const contractAddress = product.token_type === 0 ? NFT_721_CONTRACT_ADDRESS : NFT_1155_CONTRACT_ADDRESS
			const url = `https://testnets.opensea.io/assets/${contractAddress}/${product.token_id}`

			return (<Col><a href={url} target="_blank">View on OpenSea</a></Col>)
		}

		return null
	}

	render() {
		if (this.props.session.isLoading)
			return <div>Loading...</div>
		const { product, session } = this.props
		const { token } = this.state
		return(
			<Row key={product.id} className="invoice-header">
	          <Col>
	          	<img src={ token.image } className="tbl-image" alt='logo' />
	          </Col>
	          <Col>
	          	<a href={ `/product/${product.id}` }>{ token.name }</a>
	          </Col>
	          {this.renderOpenseaButton()}
	        </Row>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { publishProduct, fetchToken })(HomeProduct);
export default withRouter(connectedComponent);