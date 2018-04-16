import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Badge, Avatar } from 'antd';
import Disk from './app/disk';
import WrappedNormalLoginForm from './loginPage/loginPage'; 
import WrappedRegistrationForm from './registerPage/registerPage';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

ReactDOM.render(
  <Router>
    <div>
      <Switch>
          <Route path="/disk" component={Disk} />
          <Route path="/registerPage" component={WrappedRegistrationForm}
          />
          <Route path="/" component={WrappedNormalLoginForm} />
      </Switch>
    </div>
  </Router>
, document.getElementById('app'));