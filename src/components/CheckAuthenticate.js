import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from './Authenticate';
const RouterPrivate = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={
                routeProps =>
                getToken() !== null ?
                <Component {...routeProps}/>
                :
                (<Redirect to={{pathname: "/signin", state: { from: routeProps.location } }}/>)
        }
    />
    )   
}

export default RouterPrivate;