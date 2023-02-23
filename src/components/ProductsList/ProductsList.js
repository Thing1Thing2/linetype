import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { db } from "../../firebase";
import AddToSchedule from "./AddToSchedule";
import { Table } from "react-bootstrap";

const ProductsList = () => {
  const dataFetchedRef = useRef(false);
  const [products, setProducts] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const getProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    snapshot.forEach((doc) => {
      setProducts((products) => [...products, doc.data()]);
    });
  };

  const getSchedules = async () => {
    const snapshot = await getDocs(collection(db, "idps"));
    snapshot.forEach((doc) => {
      setSchedules((idp) => [...idp, doc.data()]);
    });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProducts();
    getSchedules();
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Download model file</th>
            <th>Add to schedule</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={v4()}>
              <td>
                <img
                  style={{ width: 300, height: 300 }}
                  src={product.image_url}
                  alt={product.image_url}
                />
              </td>
              <td>
                <Link to="/product" state={{ productId: product.productId }}>
                  {product.productName}
                </Link>
              </td>
              <td>{product.productPrice}</td>
              <td>
                <a href={product.model_url} download="filename">
                  Download
                </a>
              </td>
              <td>
                <AddToSchedule
                  productId={product.productId}
                  schedules={schedules}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsList;
