import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from './components/homePageComponent';

export default (
    <BrowserRouter>
        <div>
            <Switch>
             <Route  path='/' component={HomePage}/>
            </Switch>
        </div>
    </BrowserRouter>
);
