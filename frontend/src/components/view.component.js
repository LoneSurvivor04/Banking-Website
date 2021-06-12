import React, { Component } from 'react';
import axios from 'axios';

export default class Transfer extends Component {
  constructor(props) {
    super(props);

    this.creditRef=React.createRef();
    this.debitRef=React.createRef();
    this.onChangeCreditName = this.onChangeCreditName.bind(this);
    this.onChangeDebitName = this.onChangeDebitName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.userDetails = this.userDetails.bind(this);

    this.state = {
      debitFrom: 'Choose',
      creditTo: 'Choose',
      amount: '',
      dusers: [],
      cusers: [],
      bal: []
    }


  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            dusers: response.data.map(user => user.name),
            cusers: response.data.map(user => user.name),
            bal: response.data.map(user => user.balance),
            debitFrom: response.data[0].name,
            creditTo: response.data[1].name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  onChangeCreditName(e) {
    this.setState({
      creditTo: e.target.value,
      
    })
  }

  onChangeDebitName(e) {
    this.setState({
      debitFrom: e.target.value,
      cusers: this.state.dusers.filter(event => event !== e.target.value)
    })
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })

  }

  onSubmit(e) {
    e.preventDefault();

    const transac = {
      debitedFrom: this.state.debitFrom,
      creditedTo: this.state.creditTo,
      amt: this.state.amount,
      date: new Date(),
      flag:""
    }

    if(parseInt(transac.amt)<=parseInt(this.state.bal[this.state.dusers.indexOf(transac.debitedFrom)]))
    {
      transac.flag="Transaction Successfull";
        const updatetrans1={
          name:transac.debitedFrom,
          balance:parseInt(this.state.bal[this.state.dusers.indexOf(transac.debitedFrom)])-parseInt(transac.amt)
        }
        
        const updatetrans2={
          name:transac.creditedTo,
          balance:parseInt(this.state.bal[this.state.dusers.indexOf(transac.creditedTo)])+parseInt(transac.amt)
        }
        axios.put('http://localhost:5000/users/view/transfer', updatetrans1).catch((error) => {
          console.log(error);
        })
        axios.put('http://localhost:5000/users/view/transfer', updatetrans2).catch((error) => {
          console.log(error);
        })

        alert(transac.flag);
    }
    else
    {
        transac.flag="Transaction Failed";
        alert(transac.flag);
    }
    axios.post('http://localhost:5000/users/view/transfer', transac).catch((error) => {
      console.log(error);
      
    })
  }

  

  userDetails = () => {
    const url="http://localhost:3000/usertrans/"+this.state.debitFrom
    window.location.href=url;
  }

  render() {
    return (
      <div id="pad">
      <h3><b>Transaction Details</b></h3>
      <form onSubmit={this.onSubmit}>
        <div class="form-group" > 
          <label>Debit From: </label>
          <select ref={this.creditRef}
              required
              class="form-control" aria-label=".form-select-lg example" 
              value={this.state.debitFrom}
              onChange={this.onChangeDebitName}>
              {
                this.state.dusers.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>

        <div class="form-group" > 
          <label>Credit To: </label>
          <select ref={this.debitRef}
              required
              class="form-control" aria-label=".form-select-lg example" 
              value={this.state.creditTo}
              onChange={this.onChangeCreditName}>
              {
                this.state.cusers.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        
        <div class="form-group" >
          <label>Amount: </label>
          <input 
              type="value" required 
              class="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              />
        </div> 

        <div class="form-group" >
          <button type="button" class="btn btn-outline-success" onClick={this.userDetails}>Transaction Details</button>
          <input type="submit" value="Transfer" class="btn btn-outline-success"/>
          
        </div>

      </form>
    </div>
      
    )
  }
}