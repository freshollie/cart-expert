import React from "react";
import "./App.css";
import ItemList from "./containers/ItemList";
import Cart from "./containers/Cart";

const App: React.FC = () => (
  <div className="App">
    <div className="container left">
      <ItemList />
    </div>
    <div className="container right">
      <Cart />
    </div>
  </div>
);

export default App;
