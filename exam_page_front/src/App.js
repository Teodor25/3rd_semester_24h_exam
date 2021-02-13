import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import CreateStudent from './components/createStudent';
import LoginPage from './components/loginPage';
import StudentList from './components/studentList';
import Welcome from './components/welcome'; 
import UpdateStudent from './components/updateStudent';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/login' component={LoginPage} /> 
            <Route path='/createstudent' component={CreateStudent} />
            <Route path='/update' component={UpdateStudent} />
            <Route path='/studentlist' component={StudentList} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
