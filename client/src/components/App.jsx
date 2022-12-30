import React, { createContext, useState } from "react";

import NotFound from "./NotFound";
import Header from "./Header";
import Main from "./Main";
import Catalog from "./Catalog";

import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import browserHistory from "../browser-history";

export const Ctx = createContext({});

const App = () => {
  const [categoryUrl, setCategoryUrl] = useState(localStorage.getItem("categoryUrl") || '');

  return (
    <Ctx.Provider value={{

    }}>
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route exact path='/'>
            <Header setCategoryUrl={setCategoryUrl} />
            <Main/>
          </Route>
          <Route exact path='/catalog/*'>
            <Header setCategoryUrl={setCategoryUrl} />
            <Catalog categoryUrl={categoryUrl}/>
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
