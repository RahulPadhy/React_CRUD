import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  price: "",
  description: "",
  category: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, price, description, category } = state;
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !category) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            price,
            description,
            category,
          })
          .then(() => {
            setState({ name: "", price: "", description: "", category: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Product Added Sucessfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            price,
            description,
            category,
          })
          .then(() => {
            setState({ name: "", price: "", description: "", category: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Product Updated Sucessfully");
      }

      setTimeout(() => history("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Product Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Product Price..."
          value={price || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Product Description..."
          value={description || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Product Category..."
          value={category || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
