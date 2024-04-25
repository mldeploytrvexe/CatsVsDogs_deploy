import {useState} from 'react';
import axios from 'axios';

function Loadfeedback() {
    const [result, setResult] = useState(null);

    const message = async (event) => {
        try{
            let res = await axios.get("http://localhost:8000/loadfeedbacks");
            let res1 = res.data;
            setResult(res1);
            console.log(res1)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h1>Отзывы</h1>
            <button onClick={message} type="submit">Посмотреть</button>
            <p>{result}</p>
        </div>
    )
}
export default Loadfeedback