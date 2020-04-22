import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Box from './pages/Box';
import BoxSpecific from './pages/BoxSpecific';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';

export default function RouterPage(){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/search/:search" component={Home}/>
            <Route exact path="/box" component={Box}/>
            <Route path="/box/:product/:price" component={BoxSpecific}/>
            <Route path="/signin" component={Signin}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}