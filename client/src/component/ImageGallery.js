import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import '../styles/ImageGallery.css'
const ImageGallery = (props) => {
  const [images, setImages] = useState(null);
  const [search,setSearch] = useState(props.search);



  useEffect(() => {
    setImages(props.images);
    console.log(props.images);
  }, [props.images]);


  useEffect(() => {
    getImage();
  }, []);
  
  const getImage = async () => {
    try {
        
      let { data } = await axios.get("/api/images");
      setImages(data.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete =async (id) => {
    try{
      let { data } = await axios.delete(`/api/delete/${id}`);
      window.location.reload(true);

    }
    catch(error){
      console.error(error);
    }
  }

  const handleGetImage =async (id) => {
    try{
      console.log(id);
      let { data } = await axios.get(`/api/images/${id}`);
    }
    catch(error){
      console.error(error);
    }
  }

  return (<div className="parent" style={{marginTop:'0vw'}}>
  {images
    ? images.slice(0,10).map((image) => {
        return (
          <div className="item">
          <center>
          <span key={image._id} >
            <img
              src={image.url}
              width="200rem" 
              height="250rem"
              />
            </span>
            <div >
              <h5>{image.description}</h5>
              <div>Tags: {image.tags.map(txt => <span>{txt}, </span>)} </div>
               <Button onClick={id=>handleDelete(image._id)}>Delete</Button>
              </div>
              </center>

             </div>
        );
      })
    : null}

</div>
  );
};

export default ImageGallery;