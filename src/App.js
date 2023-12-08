import Sidebar from "./components/Sidebar";
import Dashboard from "./Dashboard";
import DiabetesPredict from "./DiabetesPredict";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiabetesTrack from "./DiabetesTrack";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
       <NavBar/>
    <div className="App w-full h-[100vh] flex flex-col lg:flex-row  ">
    
    <div className="lg:w-[17%] ">
    <Sidebar/>
    </div>
   <div className="lg:w-[80%]">
        <Routes>
          <Route exact path="/" element={< Dashboard />} />
          <Route exact path="/diabetes-track" element={< DiabetesTrack />} />
          <Route exact path="/diabetes-predict" element={< DiabetesPredict />} />
          <Route exact path="/diabetes-info" element={< Dashboard />} />

        </Routes>
      </div>
    </div>
    </BrowserRouter>

  );
}

export default App;