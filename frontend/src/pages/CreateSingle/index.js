import { Link } from 'react-router-dom';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateERC721Form from '../../components/form/CreateERC721Form'

class CreateSingle extends React.Component {
	render() {
		return(
			<div className="page">
				<div className="container">
					<CreateERC721Form />
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, {})(CreateSingle);
export default withRouter(connectedComponent);