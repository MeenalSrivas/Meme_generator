import React , {useState, createRef} from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Text from "../components/Text";
import domtoimage from 'dom-to-image-more';

const EditPage = () =>{
    const [params] = useSearchParams();
    console.log(params.get("url"));
    const [count, setcount] = useState(0)
    const memRef = createRef();

    const handleSave = () => {
        const node = memRef.current;
        if (node) {
            domtoimage.toJpeg(node, {
                    quality: 0.95,
                    bgcolor: '#ffffff', // Ensure background is captured
                    /* Add other options like width/height if needed */
                 })
               .then(function (dataUrl) {
                    const link = document.createElement('a');
                    link.download = 'meme.jpeg';
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
               .catch(function (error) {
                    console.error('dom-to-image error: ', error);
                });
        }
    };

    const addText = () =>{
        setcount(count+1)


    }
    return (
        <div> 
        <div ref ={memRef} className="meme mt-5 mb-5">
        <img src = {params.get("url")} width ='250px'></img>
        {Array(count).fill(0).map((e, i) => (
            <Text key={i} />
        ))}
        
        </div>
        <Button onClick={addText}>Add text</Button>
        <Button variant="success" onClick={handleSave}>Save</Button>
        
        

    </div>
)
}

export default EditPage;