import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createProduct, CREATE_PRODUCT_SUCCESS } from '../../../actions/product/create'

import '../css/index.css'

require('dotenv').config()

class CreateERC1155Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      quantity: "",
      image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let user = this.props.session.data
    let payload = {
      userId: user.id,
      name: this.state.name,
      description: this.state.description,
      userWallet: user.address,
      quantity: this.state.quantity,
      image: this.state.image,
      tokenType: 1
    }
    let action = await this.props.createProduct(payload)
    if (action.type === CREATE_PRODUCT_SUCCESS) {
      this.props.history.push("/")
    }
  }

  render() {
    var {image} = this.state
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <label>
            Image:
            <input type="text" name="image" value={this.state.image} onChange={this.handleChange} />
          </label>
          <img src={ image } alt='logo' />
          <label>
            Quantity:
            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }
}
const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { createProduct })(CreateERC1155Form);
export default withRouter(connectedComponent);