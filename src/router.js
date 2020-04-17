import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Box from './pages/Box';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function RouterPage(){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/box" component={Box}/>
            <Route path="/contact" component={Contact}/>
            <Route path="~" component={NotFound}/>
        </Switch>
    )
}