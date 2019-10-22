import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import CreateStrategy from './views/Strategy/CreateStrategy'
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Protected from './Protected';
import IfNotComponent from './views/Pages/Login/IfNotComponent';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Strategy = React.lazy(() => import('./views/Strategy/Strategy'))
const BackTest = React.lazy(() => import('./views/BackTest/BackTest'))
const ChangePassword = React.lazy(() => import('./views/Pages/Login/ChangePassword'))
//const StrategyTest = React.lazy(() => import('./views/StrategiesTest/index'))
class App extends Component {

  constructor() {
    super()
    this.tokenChange = this.tokenChange.bind(this)
  }
  
  tokenChange(token) {
    localStorage.setItem("token", token)
  }

  render() {
    return (
      <div>
        <BrowserRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login onTokenReceived={this.tokenChange}/>
                } />
                <Route path='/register' render={props => <IfNotComponent condition={localStorage.getItem('token') != null && localStorage.getItem('token') != ''}
                                done={<Redirect to="/" />} failed={<Register {...props} />}  /> } />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route path="/ChangePassword" name="Home" render={props => <ChangePassword {...props}/>} />
                <Route path="/" name="Home" render={props => <Protected>
                  <DefaultLayout {...props}/>
                </Protected>} />
                <Route exact path="/strategies/new" render={props => <Protected>
                  <CreateStrategy {...props}/>
                </Protected>}/>
                <Route path="/strategies" render={props => <Protected>
                  <Strategy {...props}/>
                </Protected>}/>
                <Route path='/backtest' render={props => <Protected>
                  <BackTest {...props}/>
                </Protected>}/>
                <Route path='/dashboard' render={props => <Protected>
                  <DefaultLayout {...props}/>
                </Protected>} />
              </Switch>
            </React.Suspense>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

//something
