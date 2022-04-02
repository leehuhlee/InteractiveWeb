import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from "../components/DiaryList";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}. ${curDate.getMonth() + 1}`;

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Emotion Diary`;
    }, []);

    useEffect(() => {
        const firstDay = new Date(
            curDate.getFullYear(), curDate.getMonth(), 1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59
        ).getTime();

        setData(diaryList.filter((it) => 
            firstDay <= it.date && it.date <= lastDay));
    }, [diaryList, curDate]);

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1)
        );
    };

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1)
        );
    };

    return (
        <div>
            <MyHeader 
                headText={headText}
                leftChild={
                    <MyButton 
                        text={"<"} 
                        onClick={decreaseMonth} 
                    />
                }
                rightChild={
                    <MyButton text={">"} 
                    onClick={increaseMonth} 
                    />
                }
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;