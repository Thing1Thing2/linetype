import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { ref, getStorage, listAll } from "firebase/storage";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MySchedulePage = () => {
  const [idpName, setIdpName] = useState("");
  const [schedulesList, setSchedulesList] = useState([]);
  const [idpDescription, setIdpDescription] = useState("");
  const createSchedule = async (e) => {
    e.preventDefault();
    const idp_id = v4();
    const data = {
      idp_id: idp_id,
      idp_name: idpName,
      idp_decription: idpDescription,
      product_ids_and_qs: [],
    };
    let flag = 0;

    for (let i = 0; i < schedulesList.length; i++) {
      if (schedulesList[i].idp_name === idpName) {
        flag = 1;
      }
    }
    if (flag === 0) {
      setDoc(doc(db, "idps", idp_id), data)
        .then(() => {
          console.log("Document has been added successfully");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      window.alert(
        "This IDP name is already in use. Please use a different name."
      );
    }
  };
  const storage = getStorage();

  const getIdps = async () => {
    const snapshot = await getDocs(collection(db, "idps"));
    snapshot.forEach((doc) => {
      setSchedulesList((idp) => [...idp, doc.data()]);
    });
  };

  const dataFetchedRef = useRef(false);
  useEffect(() => {
    const idpsRefList = ref(storage, "idps/");
    listAll(idpsRefList).then((response) => {
      response.items.forEach((item) => {
        setSchedulesList((prev) => [...prev, item]);
      });
    });

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getIdps();
  });
  return (
    <div>
      <h1>Create schedule</h1>
      <form onSubmit={createSchedule}>
        Schedule name
        <input
          type="text"
          className="form-control"
          value={idpName}
          onChange={(e) => setIdpName(e.target.value)}
        />
        Schedule Description
        <input
          type="text"
          className="form-control"
          value={idpDescription}
          onChange={(e) => setIdpDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
      <div class="card-column">
        {schedulesList.map((schedule) => {
          return (
            <Card style={{ width: "18rem" }} key={schedule.idp_id}>
              <Card.Body>
                <Card.Title> {schedule.idp_name}</Card.Title>
                <Card.Text>{schedule.idp_decription}</Card.Text>
                <Link to="/schedule" state={{ scheduleId: schedule.idp_id }}>
                  {" "}
                  <Button variant="primary">See details</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MySchedulePage;
