import { useContext } from "react";
import { DiaryStateContext } from "./App.js";
import DiaryItem from "./DiaryItem.js";

const DiaryList = () => {
    const diaryList = useContext(DiaryStateContext);

    return (
    <div className="DiaryList">
        <h2>Diary List</h2>
        <h4>There are {diaryList.length} diaries.</h4>
        <div>
            {diaryList.map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    </div>
    );
};

DiaryList.defaultProps={
    diaryList:[],
};

export default DiaryList;