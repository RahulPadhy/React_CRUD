import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Home = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteProduct = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that product ?")
    ) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Product Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  const classes = useStyles();
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to={"/addContact"}>
        <button className="btn btn-contact">Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            {/* <th>No.</th> */}
            <th>Product</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.slice((page - 1) * 5, (page - 1) * 5 + 5).map((item, index) => {
            return (
              <tr key={item.id}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td style={{ display: "flex" }}>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-read">Read</button>
                  </Link>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        count={5}
        onChange={(_, value) => {
          setPage(value);
          // window.scrollTo(0, 450);
        }}
      />
    </div>
  );
};

export default Home;
