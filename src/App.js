import Header from './components/Header';
import React from 'react';
import MainArea from './components/MainArea';


function App() {

  const [shop, setShop] = React.useState(0)

  console.log(setShop)

  return (
    
    <>
      <Header shop={shop}></Header>
      <MainArea setShop={setShop} shop={shop}></MainArea>
    </>
  );
}

export default App;
