import React, {useEffect, useState} from "react";
import MemeCard from "../components/card";
import { getAllMemes } from "../api/memes";

const Homepage= () =>{
    const [memedata, setdata]  = useState([]); 


    useEffect(() =>{
        getAllMemes().then((memes) => setdata(memes.data.memes));

    }, [])
    return (
        <div className="row">
            {memedata.map((ele) =>(
                <MemeCard img = {ele.url} Title = {ele.name}/>
                ))}
            

        </div>

    )
}

export default Homepage;