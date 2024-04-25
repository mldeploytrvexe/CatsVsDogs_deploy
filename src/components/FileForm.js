import {useState} from 'react';
import axios from 'axios';

function FileForm() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileInputChange = (event) => {
        setFile(event.target.files[0])
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file_upload', file)
        try{
            const endpoint = "http://localhost:8000/uploadfile";
            const response = await fetch(endpoint, {
                method: "POST", 
                body: formData
            });
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                setResult(data)
            } else{
                console.error("Failed to upload file")
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
            <h1>Upload File</h1>
            <form onSubmit={handleSubmit}>
                <input type="file"  onChange={handleFileInputChange}/>
                <button type="submit">Upload</button>
            </form>
            <h>На картинке: {result}</h>
        </div>
    )
}
export default FileForm