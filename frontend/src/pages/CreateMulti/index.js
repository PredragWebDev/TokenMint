import { Link } from 'react-router-dom';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateERC1155Form from '../../components/form/CreateERC1155Form'

class CreateMulti extends React.Component {
	render() {
		return(
			<div className="page">
				<div className="container">
					<CreateERC1155Form />
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, {})(CreateMulti);
export default withRouter(connectedComponent);