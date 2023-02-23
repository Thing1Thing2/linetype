import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";

const ChooseSupplier = () => {
  const dataFetchedRef = useRef(false);
  const [suppliers, setSuppliers] = useState([]);
  const getSuppliers = async () => {
    const snapshot = await getDocs(collection(db, "suppliers"));
    snapshot.forEach((doc) => {
      setSuppliers((products) => [...products, doc.data()]);
    });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getSuppliers();
  }, []);

  return (
    <div>
      <label for="country">Choose supplier</label>
      <select
        id="supplier"
        name="supplier"
        autocomplete="none"
        enterkeyhint="done"
        required
      >
        {suppliers.map((supplier) => (
          <option value={supplier.supplierID}>
            {supplier.supplierName} ({supplier.supplierCity})
          </option>
        ))}
        <option value="add new supplier">add supplier</option>
      </select>
    </div>
  );
};

export default ChooseSupplier;
