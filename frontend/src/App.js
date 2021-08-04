import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import  Navy  from './components/Navy'
import Autho from './components/Autho'
import { Provider } from "react-redux";
import store from "./store";
import {Container, Row} from "react-bootstrap"
import Login from './components/accounts/Login'
import PrivateRoute from './components/common/PrivateRoute'
import LeftBar from "./components/LeftBar";
import ArchiveL from './components/ArchiveL';
import Head from './components/Head';
import SpefArc from './components/SpefArc';
import RegisterForm from "./components/accounts/RegisterForm";
import './components/css/side.css'





function App() {
  
  

 

  return (

    <Provider store={store}>
      <Autho />
      <Router>
        <>
        
        
          <Container className="tall " fluid >
            <Switch>
             
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={Login} />
             
              
              <>
              <Navy/>
              <Row className="justify-content-center ">
              <LeftBar/>
              <Route exact path="/" component={Head} />
              <Route exact path="/archives" component={ArchiveL} />
              <Route path="/archive/:id" component={SpefArc}/>
              </Row>
              </>
            </Switch>
          </Container>
        </>
      </Router>
    </Provider>
  );
}

export default App;
