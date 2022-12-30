import React, { createContext } from "react";

import NotFound from "./NotFound";
import Header from "./Header";
import Main from "./Main";
import Catalog from "./Catalog";

import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import browserHistory from "../browser-history";
import PrivateRoute from '../private-route';
import Api from "../api";

export const Ctx = createContext({});

const App = () => {
  return (
    <Ctx.Provider value={{

    }}>
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route exact path='/'>
            <Header/>
            <Main/>
          </Route>
          <Route exact path='/catalog'>
            <Header/>
            <Catalog/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Ctx.Provider>
  );
};

export default App;
