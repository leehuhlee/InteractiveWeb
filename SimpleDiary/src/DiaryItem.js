import React, { useRef, useState } from "react";

const DiaryItem = ({
    onUpdate,
    onDelete, 
    id, 
    author, 
    content, 
    emotion, 
    created_date
}) => {

    const [isEdit, SetIsEdit] = useState(false);
    const toggleIsEdit = () => SetIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const handleRemove = () => {
        if(window.confirm(`Do you want to delete ${id}th diary?`)){
            onDelete(id);
        };
    };

    const handleCancel = () =>{
        SetIsEdit(false);
        setLocalContent(content);
    }

    const handleUpdate = () => {
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }

        if(window.confirm(`Do you want to update ${id}th diary?`)){
            onUpdate(id, localContent);
            toggleIsEdit();
        }
    };

    return (
    <div className="DiaryItem">
        <div className="info">
            <span>
                Author : {author} | Emotion Point : {emotion}
            </span>
            <br />
            <span className="date">{new Date(created_date).toLocaleString()}</span>
        </div>
        <div className="content">
            {isEdit ? (
            <>
                <textarea 
                ref={localContentInput}
                value={localContent} 
                onChange={(e) => setLocalContent(e.target.value)}
                />
            </>
            ) : (
            <>{content}</>
            )}
        </div>

        {isEdit ? (
        <>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleUpdate}>Save</button>
        </>
        ) : (
        <>
            <button onClick={handleRemove}>Delete</button>
            <button onClick={toggleIsEdit}>Update</button>
        </>
        )}
    </div>
    );
};

export default React.memo(DiaryItem);