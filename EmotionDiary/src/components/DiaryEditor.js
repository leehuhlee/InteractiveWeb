import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App"
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const DiaryEditor = ({isEdit, originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit} = useContext(DiaryDispatchContext);
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    };
    const navigate = useNavigate();

    const handleSubmit = () =>{
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "Do you want to edit this diary?" : "Do you want to write new diary?")){
            if(!isEdit){
                onCreate(date, content, emotion);
            }
            else{
                onEdit(originData.id, date, content, emotion);
            }
        }
        navigate('/', {replace: true});
    };

    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={isEdit ? "Edit Diary" : "Write New Diary"} 
                leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>What date is it today?</h4>
                    <div className="input_box">
                        <input className="input_date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>Today's Emotion</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem 
                                key={it.emotion_id} {...it} 
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />    
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today's Diary</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                            placeholder="How was it today?" 
                            ref={contentRef} 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)}/>
                    </div> 
                </section>
                <section>
                    <div className="control_box">
                        <MyButton 
                            text={'Cancel'} 
                            onClick={() => navigate(-1)}
                        />
                        <MyButton
                            text={'Save'}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;