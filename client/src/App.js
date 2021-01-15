import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Upload from "./component/Upload";
import ImageGallery from "./component/ImageGallery";
import SearchField from "react-search-field";
import axios from "axios";
import { Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


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
  axios.get(`https://shopifychallengechris.herokuapp.com/api/search/${value}`).then((response) => setImages(response.data.images));
}
const getImage = async () => {
  try {
      
    let { data } = await axios.get(`https://shopifychallengechris.herokuapp.com/api/images`);
    setImages(data.images);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div  style={{background:'#EAEDED',width:'100vw'}}>      

<Navbar bg="dark" variant="dark" style={{marginBottom:'4vh'}}>
    <Navbar.Brand href="#home">Chris Cui Shopify Project</Navbar.Brand>
    <Nav className="mr-auto" style={{marginLeft:'2vw'}}>
      <Button  variant="outline-info" style= {{marginRight:'3vw'}}onClick = {getImage}>View All Images</Button> 
      <Upload/>
      <div style={{marginLeft:'10vw'}}>
      <SearchField
            placeholder="SEARCH BY IMAGE TAG"
            onChange={onChange}
            classNames="test-class"
            onEnter={onEnter}
            onSearchClick={onSearchClick}
          />
          </div>
          
    </Nav>
      
  </Navbar>

    <ImageGallery search={input} images={images}/>

    </div>
    );
}
export default App;