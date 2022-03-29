import React, { useMemo, useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import LifeCycle from './LifeCycle';

const reducer = (state, action) => {
  switch(action.type){
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      };
      return [newItem, ...state];
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "UPDATE": {
      return state.map((it) => 
        it.id === action.targetId ? 
        {...it, content: action.newContent} : it);
    }
    default: 
      return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
      ).then((res) => res.json());
      
      const initData = res.slice(0, 20).map((it) => {
        return {
          author: it.email,
          content : it.body,
          emotion : Math.floor(Math.random() * 5 ) + 1,
          created_date : new Date().getTime(),
          id : dataId.current++
        };
      });

      dispatch({type: "INIT", data: initData});
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((
    author, content, emotion) => {
      dispatch({type: "CREATE", data: {author, content, emotion, id:dataId.current++}});
    }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({type: "DELETE", targetId})
  }, []);

  const onUpdate = useCallback((targetId, newContent) => {
    dispatch({type: "UPDATE", targetId, newContent});
  }, []);

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onDelete, onUpdate};
  }, []);

  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return {goodCount, badCount, goodRatio};
    }, [data.length]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <LifeCycle/>
          <DiaryEditor/>
          <div>Total Diary : {data.length}</div>
          <div>Good Emotion Diary Count : {goodCount}</div>
          <div>Bad Emotion Diary Count : {badCount}</div>
          <div>Good Emotion Diary Ratio : {goodRatio}</div>
          <DiaryList/>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
