import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Users extends Component {
  constructor(props) {
    super(props);
     this.state = {
      posts: []
    };
  }
  componentDidMount = () => {
    this.getUsers();
  };


  getUsers = () => {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        this.setState({ posts: response.data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  displayUsers = (posts) => {
  
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <tr key={index}>
      <th scope="row">{index+1}</th>
      <td className="name">{post.name}</td>
      <td>{post.email}</td>
      <td>{post.balance}</td>
      <td><Link to="/users/view"><button type="button" className="btn btn-outline-success">View</button></Link></td>
    </tr>
    ));

    
  
  }

  render() { 

    return(
        <div className="container">
          <hr/>
          <h4 id="header">List of All the Customers</h4>
          <hr/>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.displayUsers(this.state.posts)}
            </tbody>
          </table>
        </div>
    );
  }
}