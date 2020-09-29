import React from 'react';
import './App.css';
import ItemList from './containers/ItemList';
import Cart from './containers/Cart';

function App() {
  return (
    <div className="App">
      <ItemList />
      <Cart />
    </div>
  );
}

export default App;
