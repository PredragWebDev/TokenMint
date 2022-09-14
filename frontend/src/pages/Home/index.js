import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import HomeProduct from '../../components/table/HomeProduct'
import React from 'react';
import './index.css';

class Home extends React.Component {
	render() {
		return(
			<div className="page">
				<div className="container">
					<Link to="/new/product">Create Product</Link>
					<div className="list">
						<label>Products</label>
						{this.props.product.data ? 
							(
								<div>
									{this.props.product.data.map((product) => {
										return (<HomeProduct key={product.id} product={product} />)
									})}
								</div>
							) : null}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ session, product }) => ({ session, product });
const connectedComponent = connect(mapStateToProps, {})(Home);
export default withRouter(connectedComponent);