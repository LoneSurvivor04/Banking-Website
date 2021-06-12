import React, { Component } from 'react';
import axios from 'axios';

export default class userTransactions extends Component {
    constructor(props) {
        super(props);
        this.state={
            url:'',
            posts:[]
        };
      }
    
    componentDidMount()
    {
        this.state.url=window.location.href;
        this.state.posts = this.state.url.split("/");
        this.state.url= this.state.posts[this.state.posts.length - 1];
        this.getTransactions();
    }

    getTransactions = () => {
        axios.get('http://localhost:5000/usertrans/'+this.state.url)
          .then((response) => {
            this.setState({ posts: response.data });
          })
          .catch(() => {
            alert('Error retrieving data!!!');
          });
      }
    
      displayTransactions = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
          <li key={index} className="list-group-item">An amount of <b>Rs.{post.amt}</b> is tranfered from <b>{post.debitedFrom}</b> to <b>{post.creditedTo}</b> on {post.date}</li>
        ));
    }
    
      render() {
    
        return(
        <div className="container-sm">
            <ul className="list-group">
            <li className="list-group-item list-group-item-action list-group-item-dark">All Transactions to and from <b>{this.state.url}</b> </li>
            {this.displayTransactions(this.state.posts)}
            </ul>
        </div>
        );
      }
}