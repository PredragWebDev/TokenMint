import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct, CREATE_PRODUCT_SUCCESS } from '../../../actions/product/create'
import '../css/index.css'

class CreateERC721Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
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
      image: this.state.image,
      tokenType: 0
    }
    let action = await this.props.createProduct(payload)
    if (action.type === CREATE_PRODUCT_SUCCESS) {
      this.props.history.push("/")
    }
  }

  render() {
    var { image } = this.state
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
          <input type="submit" value="Submit" />
        </form>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { createProduct })(CreateERC721Form);
export default withRouter(connectedComponent);