import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Upload from "./component/Upload";
import ImageGallery from "./component/ImageGallery";
import SearchField from "react-search-field";
import axios from "axios";
import { Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';



const App = () => {  
  
const [input, setInput] = React.useState("");
const [images,setImages] = React.useState(null);


useEffect(() => {
  handleSearch(input);
}, []);


const onChange = (value,event) => {
  setInput(event.target.value);
}
const onEnter =  (value,event) =>{
    handleSearch(value);
}
const onSearchClick = (value) =>{
  handleSearch(value);
}

const handleSearch = (value)=>{
  axios.get(`/api/search/${input}`).then((response) => setImages(response.data.images));
}
const getImage = async () => {
  try {
      
    let { data } = await axios.get("/api/images");
    setImages(data.images);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="container" style={{background:'#EAEDED',width:'100vw'}}>      
      <div style={{marginLeft:'5vw',display:'flex',alignItems:'flex-start'}}>

<div style={{height:'8vw'}}>
      <Button size="sm" onClick={getImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"></path>
  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"></path>
</svg>
                View All Images
              </Button>
              </div>
      <div style={{marginLeft:'10vw'}}>
          <SearchField
            placeholder="SEARCH BY IMAGE TAG"
            onChange={onChange}
            classNames="test-class"
            onEnter={onEnter}
            onSearchClick={onSearchClick}
          />
        <div style={{marginLeft:'20vw',marginTop:'-1vw'}}>
    <Upload />
    </div>
       </div>

    <br/>
</div>
    <ImageGallery search={input} images={images}/>

    </div>
    );
}
export default App;