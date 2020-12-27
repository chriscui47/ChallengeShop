import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Upload from "./components/Upload";
import ImageCarousel from "./components/ImageCarousel";
function App() {
  return (
    <div className="container">
    <ImageCarousel />
    <Upload />
    </div>
    );
}
export default App;