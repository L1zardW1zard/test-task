import React, { useEffect, useReducer } from "react";
import Header from "./components/header";
import RestGET from "./components/restGET";
import RestPOST from "./components/restPOST";
import reducer from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, { update: false });

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <section>
          <div className="main-banner">
            <div className="banner-card-wrapper">
              <h1>Test assignment for front-end developer</h1>
              <p>
                What defines a good front-end developer is one that has skilled
                knowledge of HTML, CSS, JS with a vast understanding of User
                design thinking as they'll be building web interfaces with
                accessibility in mind. They should also be excited to learn, as
                the world of Front-End Development keeps evolving.
              </p>
              <button>Sign up</button>
            </div>
          </div>
        </section>

        <RestGET dispatch={dispatch} newUserRegistered={state} />

        <RestPOST dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
