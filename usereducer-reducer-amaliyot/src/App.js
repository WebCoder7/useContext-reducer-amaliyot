// App.js
import { useReducer, useState } from 'react';
import './App.css';
import Aside from './components/aside/Aside';
import Main from './components/main/Main';
import Header from './components/header/Header';
import reducer, { initialState } from './store/reducer';
import { Context } from './context/Context';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      <div className='main-wrapper'>
        <Aside
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Main
          sortBy={sortBy}
          selectedBrand={selectedBrand}
          selectedColor={selectedColor}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
