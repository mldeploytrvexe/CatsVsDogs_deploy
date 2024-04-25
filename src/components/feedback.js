import {useState} from 'react';

function Feedback() {
    const [val, setVal] = useState(null);

    const textChange = (event) => {
        setVal(event.target.value)
        //console.log(val)
    }

    const click = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('text_upload', val)
        console.log(val);
        const d = {
            "data": val
        };
        try{
            const endpoint = "http://localhost:8000/uploadfeedback";
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData
            });
            //const data = await response.json()
            if (response.ok) {
                //console.log('data')
                alert('отзыв отправлен!')
            } else{
                console.error("Failed to send feedback")
            }
        } catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h1>Оставить отзыв</h1>
            <form onSubmit={(e)=>click(e)}>
                <input onChange={(e) => textChange(e)} id='text' value={val} type="text"/>
                <button type="submit">Отправить</button>
            </form>
        </div>
    )
}
export default Feedback