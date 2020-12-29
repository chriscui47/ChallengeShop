
const express = require("express");
const {upload,cloudinary} = require("../services/upload");
const router = express.Router();
const Image = require("../models/Image");
const cors = require('cors');
var bodyParser = require("body-parser");

router.use(cors())

router.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:5000', 'http://localhost:3000', 'https://relaxed-sinoussi-846966.netlify.app'];

  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');
  res.header('Access-Control-Allow-Credentials', true);

  return next();
});
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/images", async (req, res) => {
    try {
      let images = await Image.find({});
      console.log("finding image")
      console.log(images[0])
      return res.status(200).json({ images, msg: "image info fetched"    });
    } catch (error) {
      console.error(error);
        return res.status(500).json({ error: "some error occured" });
    }
    }
      
);


router.get("/images/:id", async (req, res) => {
  try {
    var o_id = new ObjectId(req.params.id);
    let image = Image.find({_id:o_id});
    return res.status(200).json({msg: "image received"    });
  } catch (error) {
    console.error(error);
      return res.status(500).json({ error: "some error occured" });
  }
}
    
);
router.get("/search/:searchquery", async (req, res) => {
  try {
    console.log(req.params.searchquery);
    let images = await Image.find( { tags: req.params.searchquery }  )
    console.log(images);
    return res.status(200).json({ images, msg: "image info fetched"    });
  } catch (error) {
    console.error(error);
      return res.status(500).json({ error: "some error occured" });
  }
  }
    
);


router.post("/upload", upload.single("picture",public_id=>req.body.id), async (req, res) => {
    try {
      if (req.file && req.file.path) {
        const tagsArray= req.body.tags.split(',');
        console.log(tagsArray);
        const image = new Image({
          description: req.body.desc,
            url: req.file.path,
            tags:tagsArray
    });
    await image.save();
    return res.status(200).json({ msg: "image successfully saved" });
    } else {
        console.log(req.file);
        return res.status(422).json({ error: "invalid" });
        }
        } catch (error) {
        console.error(error);
    return res.status(500).json({ error: "some error occured" });
        }
    }
  
  );

router.delete('/delete/:id/', (req, res) => {
  try{
        Image.findByIdAndRemove(req.params.id,function(err,data)
   {
       if(!err){
           console.log("Deleted image with id %s",req.params.id);
       }
   });
  
   return res.status(200).json({ msg: "image successfully deleted" });
  }
  catch(err){
    console.error(err);
  }
}

);

module.exports = router;