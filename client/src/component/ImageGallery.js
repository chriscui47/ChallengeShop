import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import '../styles/ImageGallery.css'
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';


const ImageGallery = (props) => {
  const [images, setImages] = useState(null);
  const [search,setSearch] = useState(props.search);

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

  useEffect(() => {
    setImages(props.images);
    console.log(props.images);
  }, [props.images]);


  useEffect(() => {
    getImage();
  }, []);
  
  const getImage = async () => {
    try {
        
      let { data } = await axios.get("https://shopifychallengechris.herokuapp.com/api/images");
      setImages(data.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete =async (id) => {
    try{
      let { data } = await axios.delete(`https://shopifychallengechris.herokuapp.com/api/delete/${id}`);
      getImage();

    }
    catch(error){
      console.error(error);
    }
  }

  const handleGetImage =async (id) => {
    try{
      console.log(id);
      let { data } = await axios.get(`https://shopifychallengechris.herokuapp.com/api/images/${id}`);
    }
    catch(error){
      console.error(error);
    }
  }
  const classes = useStyles();

  return (<div className="parent" style={{marginTop:'0vw'}}>
  {images
    ? images.slice(0,10).map((image) => {
        return (
          <div className="item">
          <center>

              <Card className={classes.root} style={{marginLeft:'2vw'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={image.url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {image.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Tags: {image.tags.map(txt => <span>{txt}, </span>)} 
                    </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button variant="outline-info" onClick={id=>handleDelete(image._id)}>Delete</Button>

      </CardActions>
    </Card>




              </center>

             </div>
        );
      })
    : null}

</div>
  );
};

export default ImageGallery;