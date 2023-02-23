import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const AddToSchedule = ({ productId, schedules }) => {
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addSchedule = async () => {
    // edit schedule, append product to idp document
    const q = query(
      collection(db, "idps"),
      where("idp_id", "==", selectedSchedule)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (id) => {
      // updated array of products
      const arr = [];
      let flag = 0;
      const productsAlreadyInSchedule = id.data().product_ids_and_qs;

      if (productsAlreadyInSchedule.length !== 0) {
        id.data().product_ids_and_qs.forEach(async (prodId) => {
          if (prodId.productId === productId && prodId.quantity === quantity) {
            flag = 1;
          } else {
            arr.push(prodId);
          }
        });
      }
      console.log(flag);
      if (flag === 0) {
        const data = { productId: productId, quantity: quantity };
        arr.push(data);
        console.log(arr);
        const newData = {
          product_ids_and_qs: arr,
        };

        const docRef = doc(db, "idps", selectedSchedule);
        try {
          await updateDoc(docRef, newData);
          window.alert("schedule updated");
        } catch (error) {
          console.log(error);
        }
      } else {
        window.alert(
          "This product and quantity already exists in the schedule."
        );
      }
    });
  };

  return (
    <div>
      <select id="schedule" name="schedule" required>
        {
          <option value="" autoComplete="none">
            select schedule
          </option>
        }
        {schedules.map((schedule) => {
          return (
            <option
              value={schedule.idp_id}
              product={productId}
              key={schedule.idp_id}
              onClick={async () => {
                setSelectedSchedule(schedule.idp_id);
              }}
            >
              {schedule.idp_name}
            </option>
          );
        })}
      </select>
      <br />
      <b> Add quantity:</b> <br />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      ></input>
      <br />
      <button className="btn btn-success" onClick={() => addSchedule()}>
        Add
      </button>
    </div>
  );
};

export default AddToSchedule;
