//import './App.css';
// import { useState, useEffect } from 'react'
// import { supabase } from './client'
//import Task from './Task';
//import { useAuth } from "./pages/signin";
//import AuthBasic from "./pages/signin";

// function App() {
//   const { user } = useAuth();
//   return (
//     <div className="App">
//user ? <Home/> : <AuthBasic/>
//     </div>
//   );
// }
// export default App;

import React from "react";
import Home from "./pages/home";
import './App.css';

function App() {
  return (
    <div className="App" style={{
      backgroundColor: "rgb(238, 219, 248)"}}>
    <Home/>
     </div>
  );
}
export default App;
