import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Box from './pages/Box';
import Signin from './pages/Signin';
import InformationProduct from './pages/InformationProduct';
import NotFound from './pages/NotFound';

export default function RouterPage(){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/box" component={Box}/>
            <Route path="/signin" component={Signin}/>
            <Route exact path="/product/:id/information/" component={InformationProduct}/>
            <Route path="~" component={NotFound}/>
        </Switch>
    )
}