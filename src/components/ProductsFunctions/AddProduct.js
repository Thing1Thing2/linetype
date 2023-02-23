import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const storage = getStorage();

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const getSuppliers = async () => {
    const snapshot = await getDocs(collection(db, "suppliers"));
    await snapshot.forEach((doc) => {
      setSuppliers((suppliers) => [...suppliers, doc.data()]);
    });
  };
  const dataFetchedRef = useRef(false);

  const submitForm = async (e) => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts([]);
    await snapshot.forEach((doc) => {
      setProducts((products) => [...products, doc.data().productName]);
    });
    console.log(products);
    let flag = 0;
    if (products.length !== 0) {
      products.forEach(async (product) => {
        if (product === productName) {
          flag = 1;
        }
      });
    }
    e.preventDefault();
    // get supplierId
    if (flag === 0) {
      const supplierId = document.getElementById("supplier").value;
      console.log(supplierId);
      console.log(supplierId === "");
      if (supplierId === "") {
        navigate("/addsupplier");
      }

      // get image and model file
      const image = document.getElementById("input").files[0];

      if (!image) {
        alert("add image");
      }

      // store image and model
      const storageRef = ref(storage, `/images/${image.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error);
        },
        async () => {
          const modelFile = document.getElementById("model").files[0];

          if (modelFile !== undefined) {
            const modelStorageRef = ref(storage, `/3D/${modelFile.name}`);
            await getDownloadURL(await uploadTask.snapshot.ref).then(
              async (url) => {
                if (!modelFile) {
                  const modelUploadTask = uploadBytesResumable(
                    modelStorageRef,
                    modelFile
                  );
                  modelUploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (error) => {
                      alert(error);
                    },
                    async () => {
                      await getDownloadURL(
                        await modelUploadTask.snapshot.ref
                      ).then(async (modelUrl) => {
                        const productId = v4();
                        const data = {
                          productId: productId,
                          productName: productName,
                          productPrice: productPrice,
                          image_url: url,
                          model_url: modelUrl,
                          supplier_id: supplierId,
                        };
                        console.log(data);

                        setDoc(doc(db, "products", productId), data)
                          .then(() => {
                            window.alert(
                              "Document has been added successfully"
                            );
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      });
                    }
                  );
                }
              }
            );
          } else {
            await getDownloadURL(await uploadTask.snapshot.ref).then((url) => {
              const productId = v4();
              const data = {
                productId: productId,
                productName: productName,
                productPrice: productPrice,
                image_url: url,
                model_url: "",
                supplier_id: supplierId,
              };
              console.log(data);

              setDoc(doc(db, "products", productId), data)
                .then(() => {
                  window.alert("Document has been added successfully");
                })
                .catch((error) => {
                  alert(error);
                });
            });
          }
        }
      );
    } else {
      window.alert(
        "This product name already exists, please us a different name."
      );
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getSuppliers();
  }, []);
  return (
    <div>
      <h1>Add Product</h1>
      <div class="form-group">
        Product name
        <input
          type="text"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div class="form-group">
        Product price
        <input
          type="number"
          className="form-control"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div class="form-group">
        Product image &nbsp;
        <input type="file" id="input" />
      </div>
      <div class="form-group">
        {" "}
        Product model file &nbsp;
        <input type="file" id="model" />
      </div>
      <div class="form-group">
        {" "}
        <label htmlFor="country">Choose supplier</label>
        <select id="supplier" name="supplier" autoComplete="none" required>
          {<option value=""></option>}
          {suppliers.map((supplier) => (
            <option value={supplier.supplierId} key={supplier.supplierId}>
              {supplier.supplierName} ({supplier.supplierCity})
            </option>
          ))}
          <option value="">add supplier</option>
        </select>
      </div>
      <div class="form-group">
        {" "}
        <button
          className="btn btn-success"
          onClick={(e) => {
            submitForm(e);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
