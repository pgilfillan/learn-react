import React from 'react';
import SideDrawer from './components/SideDrawer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <SideDrawer />
    </BrowserRouter>
  );
}

export default App;
