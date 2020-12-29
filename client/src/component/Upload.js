import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import React, { Component, useState,useEffect } from "react";

const Upload = () => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("picture", image, image.name);
      formData.append("desc", description);
      formData.append("tags", tags);

      let res = await axios.post("/api/upload", formData);
      window.location.reload(true);
      setError(false);
      handleClose();
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const fileData = () => {
    if (image)
      return (
        <h5>
          {" "}
          <em> {image.name} </em>{" "}
        </h5>
      );

    return null;
  };

  return (
    <>
      <Button size="lg"  onClick={handleShow}>
        {" "}
        Upload
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="desc">description</label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                value={description}
                className="form-control"
                required
                id="desc"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (1 word each, seperated by commas)</label>
              <input
                onChange={(e) => setTags(e.target.value)}
                type="text"
                value={tags}
                className="form-control"
                required
                id="tags"
              />
            </div>
            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="custom-file-input"
                  id="image"
                />

                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose File"}
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            {error ? (
              <div className="text-danger">
                Error
              </div>
            ) : null}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Upload;