import DiaryItem from "./DiaryItem.js";

const DiaryList = ({onUpdate, onDelete, diaryList}) => {
    return (
    <div className="DiaryList">
        <h2>Diary List</h2>
        <h4>There are {diaryList.length} diaries.</h4>
        <div>
            {diaryList.map((it) => (
                <DiaryItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
            ))}
        </div>
    </div>
    );
};

DiaryList.defaultProps={
    diaryList:[],
};

export default DiaryList;