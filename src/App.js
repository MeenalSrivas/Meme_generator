import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditPage from "./pages/Edit";

import Homepage from "./pages/Home";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>MemeGenerator</h1>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path ="/edit" element={<EditPage />}></Route>
</Routes>
    </div>
  );
}

export default App;
