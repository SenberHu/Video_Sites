import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './pages/common/index.jsx';
import Home from './pages/home/index.jsx';
import Login from './pages/login/index.jsx';
import Register from './pages/login/register.jsx';
import Upload from './pages/upload/index.jsx';
import Person from './pages/person/index.jsx';
import Search from './pages/home/search.jsx';
import Student from './pages/student/index.jsx';
import Teacher from './pages/teacher/index.jsx';

const router =
  <Route path='/' component={App}>
    <IndexRoute component={Person} />
    <Route path='/login' component={Login} />
    <Route path='/student' component={Student} />
    <Route path='/teacher' component={Teacher} />
    <Route path="/home" component={Home} />
    <Route path='/register' component={Register} />
    <Route path='/upload' component={Upload} />
    <Route path='/search' component={Search} />
    <Route path='/person/:type' component={Person} />
  </Route>

export default router;
