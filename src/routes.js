import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { MAIN, PLAY, ADMIN, CONTROLPANEL } from './utils/routeConstants'

import Main from './components/Main'
import PlayRoom from './components/PlayRoom'
import Admin from './components/Admin'
import ControlPanel from './components/ControlPanel'


const Router = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={MAIN} component={Main}/>
                <Route exact path={PLAY} component={PlayRoom}/>
                <Route exact path={ADMIN} component={Admin}/>
                <Route exact path={CONTROLPANEL} component={ControlPanel}/>
            </Switch>
        </React.Fragment>
    )
}

export default Router;

