import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../pages/Home'
import Auth from './Auth'

export interface AppProps {
}

const App: React.FunctionComponent<AppProps> = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/auth' component={Auth}/>
        </Switch>
    )
}

export default App
