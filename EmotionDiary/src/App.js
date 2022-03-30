import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

import MyButton from './components/MyButton'

function App() {
  return (
    <BrowserRouter>  
      <div className="App">
        <h2>App.js</h2>
        <MyButton 
          text={'Button'} 
          onClick={() => alert("Button clicked")} 
          type={'positive'}/>
        <MyButton 
          text={'Button'} 
          onClick={() => alert("Button clicked")} 
          type={'negative'}/>
        <MyButton 
          text={'Button'} 
          onClick={() => alert("Button clicked")} 
          />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/new' element={<New/>}/>
          <Route path='/edit' element={<Edit/>}/>
          <Route path='/diary/:id' element={<Diary/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
