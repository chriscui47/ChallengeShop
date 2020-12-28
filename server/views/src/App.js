import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Upload from "./component/Upload";
import ImageGallery from "./component/ImageGallery";
import SearchField from "react-search-field";
import axios from "axios";
import { Button } from "react-bootstrap";



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
      <div style={{marginLeft:'25vw',width:'100vw'}}>
          <SearchField
            placeholder="Search..."
            onChange={onChange}
            classNames="test-class"
            onEnter={onEnter}
            onSearchClick={onSearchClick}
          />
       </div>

    <br/>

    <Button onClick={getImage}>Go home</Button>
    <ImageGallery search={input} images={images}/>
    <Upload />

    </div>
    );
}
export default App;