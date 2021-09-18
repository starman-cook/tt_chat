import React from 'react'
import {Redirect, Route, Switch, withRouter } from "react-router-dom"
import Register from "./containers/Register/Register"
import Login from "./containers/Login/Login"
import {useSelector} from "react-redux"
import ChatPage from "./containers/ChatPage/ChatPage";
import Header from "./components/Header/Header";

function App() {
  const user = useSelector(state => state.users.user)
  return (
    <>
        <Header
            user={user}
        />
      <Switch>
          <ProtectedRoute
            isAllowed={user && user.token}
            redirectTo={"/register"}
            path="/"
            exact
            component={ChatPage}
          />
          <Route path="/register" exact component={withRouter(Register)} />
          <Route path="/login" exact component={withRouter(Login)} />
      </Switch>

    </>
  )
}

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />
}

export default App
