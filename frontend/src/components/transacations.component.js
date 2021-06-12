import React, { Component } from 'react';
import axios from 'axios';

export default class Transactions extends Component {
  state = {
      posts: []
    };
  
    componentDidMount = () => {
      this.getTransactions();
    };
  
  
    getTransactions = () => {
      axios.get('http://localhost:5000/transactions')
        .then((response) => {
          this.setState({ posts: response.data });
          console.log('Data has been received!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
    }
  
    displayTransactions = (posts) => {
    
      if (!posts.length) return null;
      return posts.map((post, index) => (
        <li key={index} className="list-group-item" id="header">An amount of <b>Rs.{post.amt}</b> is tranfered from <b>{post.debitedFrom}</b> to <b>{post.creditedTo}</b> on {post.date}</li>
      ));
  }
  
  render(){
    return(
    <div className="container-sm " id="width">
      <br></br>
        <ul className="list-group">
          <li className="list-group-item list-group-item-action list-group-item-dark" id="header">All Transactions</li>
          {this.displayTransactions(this.state.posts)}
        </ul>
    </div>
    )
  }
}