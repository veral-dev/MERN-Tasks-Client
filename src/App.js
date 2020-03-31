import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Projects from './components/projects/Projects'

import ProjectState from './context/projects/ProjectState'
import TaskState from './context/Tasks/TaskState'
import AlertState from './context/alert/AlertState'
import AuthState from './context/auth/authState'
import tokenAuth from './config/token'
import PrivateRoute from './components/routes/PrivateRoute'

//Revisar si tenemos un token
const token = localStorage.getItem('token')
if (token) {
  tokenAuth(token)
}


function App() {


  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>

              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={SignUp} />
                <PrivateRoute exact path="/proyectos" component={Projects} />
              </Switch>

            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
