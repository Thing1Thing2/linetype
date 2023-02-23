import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { Table } from "react-bootstrap";

// Page to view a specific schedule user created.

const Schedule = ({ scheduleId }) => {
  let schedule = {};
  let products = [];
  const [productsData, setProductsData] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const getSchedule = async () => {
    products = [];
    const docRef = doc(db, "idps", scheduleId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        schedule = docSnap.data();

        data.product_ids_and_qs.forEach(async (prod) => {
          await console.log(products.includes(prod));
          if (products.includes(prod) === false) {
            console.log(prod);
            products.push(prod);
            console.log(products);
          } else {
            console.log("CONTAINS");
          }
        });

        console.log("got schedule");
        console.log(schedule);
        console.log(products);
        let productRef;
        let snapshot;
        let count = 1;
        await products.map(async (product) => {
          productRef = doc(db, "products", product.productId);
          snapshot = await getDoc(productRef);
          const snapData = snapshot.data();
          const supplierDocRef = doc(db, "suppliers", snapData.supplier_id);
          const supplierDocSnap = await getDoc(supplierDocRef);
          if (supplierDocSnap.exists()) {
            const data = supplierDocSnap.data();
            setSupplier(data);
            console.log(data);
          } else {
            console.log("supplier document doesn't exist");
          }
          const data = {
            productCount: count,
            productName: snapData.productName,
            productId: snapData.productId,
            productPrice: snapData.productPrice,
            productImageUrl: snapData.image_url,
            productModelUrl: snapData.model_url,
            productSupplierName: supplier.supplierName,
          };
          let flag = 0;
          if (productsData.length !== 0) {
            productsData.forEach((productData) => {
              console.log(productData.productName);
              console.log(data.productName);
              console.log(productData.productId === data.productId);
              if (productData.productId === data.productId) {
                flag = 1;
              }
            });
          }
          console.log(flag);
          if (flag === 0) {
            setProductsData((product) => [...product, data]);
            count = count + 1;
            console.log(productsData);
          }
        });
      } else {
        console.log("document doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchedule();
  }, [schedule, products]);

  return (
    <div>
      <div>
        <h1>{schedule.idp_name}</h1>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Download link</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => {
              return (
                <tr key={product.productId}>
                  <td>{product.productCount}</td>
                  <td>
                    <img
                      style={{ width: 300, height: 300 }}
                      src={product.productImageUrl}
                      alt={product.productImageUrl}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <a href={product.productModelUrl} download="filename">
                      Model download link
                    </a>
                    <br /> <br />
                    Supplier name: {supplier.supplierName}
                    <br />
                    <br />
                    Supplier contact:
                    <br />
                    tel: {supplier.supplierPhoneNumber}
                    <br />
                    email:
                    {supplier.supplierEmail}
                    <br />
                    location :{supplier.supplierLocation},{" "}
                    {supplier.supplierCity}, {supplier.supplierPostCode}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Schedule;
