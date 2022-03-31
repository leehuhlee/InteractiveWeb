import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import React, { useContext, useReducer, useRef } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type){
    case 'INIT': {
      return action.data;
    };
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    };
    case 'REMOVE': {
      newState = state.filter((it) => 
        it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => 
        it.id === action.data.id ? action.data : it);
      break;
    }
    default:
      return state;
  };
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "First Diary",
    date: 1648715547522
  },
  {
    id: 2,
    emotion: 2,
    content: "Second Diary",
    date: 1648715547523
  },
  {
    id: 3,
    emotion: 3,
    content: "Third Diary",
    date: 1648715547524
  },
  {
    id: 4,
    emotion: 4,
    content: "Fourth Diary",
    date: 1648715547525
  },
  {
    id: 5,
    emotion: 5,
    content: "Fifth Diary",
    date: 1648715547526
  }
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data:{
      id: dataId.current++,
      date: new Date(date).getTime(),
      content,
      emotion,
      }
    });
  };

  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion
      }
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove
      }}>
        <BrowserRouter>  
          <div className="App">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/new' element={<New/>}/>
              <Route path='/edit/:id' element={<Edit/>}/>
              <Route path='/diary/:id' element={<Diary/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
