import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "react-bootstrap";

const ProductCard = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      await console.log(productId);
      const docRef = doc(db, "products", productId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);

          const supplierDocRef = doc(db, "suppliers", data.supplier_id);
          const supplierDocSnap = await getDoc(supplierDocRef);
          if (supplierDocSnap.exists()) {
            const data = supplierDocSnap.data();
            setSupplier(data);
          } else {
            console.log("supplier document doesn't exist");
          }
        } else {
          console.log("document doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [product, supplier, productId]);

  return (
    <div class="card" style={{ width: 18 + "rem" }}>
      <img src={product.image_url} class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text">
          <h1 class="card-title">{product.productName}</h1> Price: $
          {product.productPrice}
          <br />
          Supplier: {supplier.supplierName}
          <br />
          Supplier city: {supplier.supplierCity}
          <br />
          <a href={product.model_url} download="filename">
            <Button>Model download link</Button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
