import CardComponent from './CardComponent';
import Header from './Header';
import Items from './Items';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const loadTypeKit = `

  `;
  const [ itemUrl, setItemUrl ] = useState("")
  const auth = getAuth();
  const [ isUserSignedIn, setIsUserSignedIn ] = useState(true);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setIsUserSignedIn(true)
      setItemUrl("https://movie-eeb2c.web.app/items?token=" + uid)
      console.log(itemUrl)
    } else {
      setIsUserSignedIn(false)
    }
  });
  if (isUserSignedIn === true) {
    return (
      <div className="App">
        <script dangerouslySetInnerHTML={{__html: loadTypeKit}} />
        <Router>
          <Switch>
            <Route path="/items">
              <Header page="items" url={itemUrl}/>
              <Items />
            </Route>
            <Route path="/">
              <Header />
              <CardComponent />
            </Route>
          </Switch>
        </Router>
      </div>
    );   
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/items">
              <Header page="items"/>
              <Items/>
          </Route>
        <Route path="/">
          <Login />
        </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
