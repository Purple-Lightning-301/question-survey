import React, { useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "../../firebase";

function AdminPage(props) {
  const dbRef = ref(database);
  
  useEffect(
    () => {
      get(child(dbRef, `testuser`))
      .then((snapshot) => {
        console.log(":D");
        if (snapshot.exists()) {
          console.log(snapshot.val()['long']);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }, []
  )
  // get(child(dbRef, `testuser`))
  //   .then((snapshot) => {
  //     console.log(":D");
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return <div>Admin</div>;
}

export default AdminPage;
