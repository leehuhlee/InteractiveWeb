import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id');
    console.log("id : ", id);

    const mode = searchParams.get('mode');
    console.log('mode : ', mode);

    return (
        <div>
            <h1>Edit</h1>
            <p>This is Edit.</p>
            <button onClick={() => setSearchParams({who: "hanna"})}>QS Change</button>
            <button onClick={() => {
                navigate("/home");
            }}>HOME</button>
            <button onClick={() => {
                navigate(-1);
            }}>Back</button>
        </div>
    );
};

export default Edit;