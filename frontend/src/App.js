
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import UserList from "./components/users.component";
import TransactionList from "./components/transacations.component";
import View from "./components/view.component";
import UserTrans from "./components/usertrans.component"

function App() {
  return (
    <Router>
      <div >
      
        <div className="container">
          <Route path="/users" exact component={UserList} />
          <Route path="/transactions" component={TransactionList} />
          <Route path="/users/view" component={View}/>
          <Route path="/usertrans" component={UserTrans}/>

        </div>
      </div>
    </Router>
    
  );
}

export default App;
