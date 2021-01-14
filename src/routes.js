import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Main from './components/Main'


const Router = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' component={Main}/>
            </Switch>
        </React.Fragment>
    )
}

export default Router;

