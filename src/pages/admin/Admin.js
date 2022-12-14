import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "../../firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../../user.recoil";
import { useNavigate } from "react-router-dom";

function AdminPage(props) {
  const dbRef = ref(database);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const [datas, setDatas] = useState(null);
  const [keyArray, setKeyArray] = useState(null);

  const [name, setName] = useState("");
  const [teamlead, setTeamlead] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [totalCount, setTotalCount] = useState({
    spade: 0,
    heart: 0,
    club: 0,
    diamond: 0
  });

  useEffect(() => {
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDatas(snapshot.val());
          // console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (datas !== null) {
      let keyArray = Object.keys(datas);
      setKeyArray(keyArray);
      setFilteredArray(keyArray);
    }
  }, [datas]);

  useEffect(() => {
    let spadeCount = 0;
    let heartCount = 0;
    let diamondCount = 0;
    let clubCount = 0;
    filteredArray.forEach((key) => {
      let maxOne =
        +getValueByKey(key, 1) +
        +getValueByKey(key, 5) +
        +getValueByKey(key, 9) +
        +getValueByKey(key, 13) +
        +getValueByKey(key, 17) +
        +getValueByKey(key, 21) +
        +getValueByKey(key, 25) +
        +getValueByKey(key, 29) +
        +getValueByKey(key, 33) +
        +getValueByKey(key, 37);

        let maxTwo =
        +getValueByKey(key, 2) +
        +getValueByKey(key, 6) +
        +getValueByKey(key, 10) +
        +getValueByKey(key, 14) +
        +getValueByKey(key, 18) +
        +getValueByKey(key, 22) +
        +getValueByKey(key, 26) +
        +getValueByKey(key, 30) +
        +getValueByKey(key, 34) +
        +getValueByKey(key, 38);

        let maxThree =
        +getValueByKey(key, 3) +
        +getValueByKey(key, 7) +
        +getValueByKey(key, 11) +
        +getValueByKey(key, 15) +
        +getValueByKey(key, 19) +
        +getValueByKey(key, 23) +
        +getValueByKey(key, 27) +
        +getValueByKey(key, 31) +
        +getValueByKey(key, 35) +
        +getValueByKey(key, 39);

      let maxFour =
        +getValueByKey(key, 4) +
        +getValueByKey(key, 8) +
        +getValueByKey(key, 12) +
        +getValueByKey(key, 16) +
        +getValueByKey(key, 20) +
        +getValueByKey(key, 24) +
        +getValueByKey(key, 28) +
        +getValueByKey(key, 32) +
        +getValueByKey(key, 36) +
        +getValueByKey(key, 40);

        let minPoint = Math.min(maxOne, maxTwo, maxThree, maxFour);
        if(minPoint === maxOne) {
          spadeCount += 1;
        }
        if(minPoint === maxTwo) {
          clubCount += 1;
        }
        if(minPoint === maxThree) {
          heartCount += 1;
        }
        if(minPoint === maxFour) {
          diamondCount += 1;
        }
    });
    setTotalCount(prevTotal => {
      return {
        ...prevTotal,
        diamond: diamondCount,
        heart: heartCount,
        club: clubCount,
        spade: spadeCount,
      }
    })
  }, [filteredArray, datas]);

  const getValueByKey = (name, key) => {
    return datas[name]?.result.find((r) => r.key === key)?.value;
  };

  const handleChangeName = (e) => {
    let name = e.target.value;
    setName(name);
    setTeamlead("");
    let filteredKeyArray = keyArray.filter((key) =>
      key.toUpperCase().includes(name.toUpperCase())
    );
    setFilteredArray(filteredKeyArray);
  };

  const handleChangeTeamlead = (e) => {
    let teamleadName = e.target.value;
    setName("");
    setTeamlead(teamleadName);
    let filteredArray = [];
    keyArray.forEach((key) => {
      Object.keys(datas)?.forEach((dataKey) => {
        if (
          datas[dataKey]?.teamlead
            ?.toUpperCase()
            ?.includes(teamleadName?.toUpperCase())
        ) {
          if (!filteredArray?.includes(datas[dataKey]?.name)) {
            filteredArray.push(datas[dataKey]?.name);
          }
        }
      });
      setFilteredArray(filteredArray);
    });
  };

  const logout = () => {
    setUser("");
    localStorage.setItem("username", "");
    navigate("/naming");
  };
  // console.log(filteredArray);
  return (
    <div className="container">
      <div className="mt-3 d-flex justify-content-end">
        <button
          type="button"
          className="btn-close me-3"
          aria-label="Close"
          onClick={logout}
        ></button>
      </div>
      <label htmlFor="inputText" className="form-label mt-3">
        Search teamlead
      </label>
      <input
        type="text"
        id="inputText"
        className="form-control"
        aria-describedby="inputText"
        value={teamlead}
        onChange={handleChangeTeamlead}
      />
      <label htmlFor="inputText" className="form-label mt-3">
        Search name
      </label>
      <input
        type="text"
        id="inputText"
        className="form-control"
        aria-describedby="inputText"
        value={name}
        onChange={handleChangeName}
      />
      <div className="d-flex flex-column justify-content-end align-items-start mt-4">
        <p>S??? ng?????i c?? ??i???m th???p nh???t l?? l?? B??ch: {totalCount?.spade}</p>
        <p>S??? ng?????i c?? ??i???m th???p nh???t l?? l?? T??p: {totalCount?.club}</p>
        <p>S??? ng?????i c?? ??i???m th???p nh???t l?? l?? R??: {totalCount?.diamond}</p>
        <p>S??? ng?????i c?? ??i???m th???p nh???t l?? l?? T??p: {totalCount?.heart}</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        {filteredArray?.length > 0 &&
          filteredArray?.map((key, index) => {
            let maxOne =
              +getValueByKey(key, 1) +
              +getValueByKey(key, 5) +
              +getValueByKey(key, 9) +
              +getValueByKey(key, 13) +
              +getValueByKey(key, 17) +
              +getValueByKey(key, 21) +
              +getValueByKey(key, 25) +
              +getValueByKey(key, 29) +
              +getValueByKey(key, 33) +
              +getValueByKey(key, 37);
            let maxTwo =
              +getValueByKey(key, 2) +
              +getValueByKey(key, 6) +
              +getValueByKey(key, 10) +
              +getValueByKey(key, 14) +
              +getValueByKey(key, 18) +
              +getValueByKey(key, 22) +
              +getValueByKey(key, 26) +
              +getValueByKey(key, 30) +
              +getValueByKey(key, 34) +
              +getValueByKey(key, 38);
            let maxThree =
              +getValueByKey(key, 3) +
              +getValueByKey(key, 7) +
              +getValueByKey(key, 11) +
              +getValueByKey(key, 15) +
              +getValueByKey(key, 19) +
              +getValueByKey(key, 23) +
              +getValueByKey(key, 27) +
              +getValueByKey(key, 31) +
              +getValueByKey(key, 35) +
              +getValueByKey(key, 39);
            let maxFour =
              +getValueByKey(key, 4) +
              +getValueByKey(key, 8) +
              +getValueByKey(key, 12) +
              +getValueByKey(key, 16) +
              +getValueByKey(key, 20) +
              +getValueByKey(key, 24) +
              +getValueByKey(key, 28) +
              +getValueByKey(key, 32) +
              +getValueByKey(key, 36) +
              +getValueByKey(key, 40);
            let maxPoint = Math.max(maxOne, maxTwo, maxThree, maxFour);
            let minPoint = Math.min(maxOne, maxTwo, maxThree, maxFour);
            return (
              <table className="table table-striped" key={key + index}>
                <thead>
                  <tr>
                    <th colSpan={8}>{key}</th>
                  </tr>
                  <tr>
                    <th>1</th>
                    <th>B??ch</th>
                    <th>2</th>
                    <th>T??p</th>
                    <th>3</th>
                    <th>C??</th>
                    <th>4</th>
                    <th>R??</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tr?? tu???</td>
                    <td>{getValueByKey(key, 1)}</td>
                    <td>?????nh h?????ng m???c ti??u</td>
                    <td>{getValueByKey(key, 2)}</td>
                    <td>C??? v?? vi??n</td>
                    <td>{getValueByKey(key, 3)}</td>
                    <td>M???o hi???m</td>
                    <td>{getValueByKey(key, 4)}</td>
                  </tr>
                  <tr>
                    <td>Chuy??n gia</td>
                    <td>{getValueByKey(key, 5)}</td>
                    <td>Th??c ?????y</td>
                    <td>{getValueByKey(key, 6)}</td>
                    <td>Ngo???i giao</td>
                    <td>{getValueByKey(key, 7)}</td>
                    <td>T??? ph??t</td>
                    <td>{getValueByKey(key, 8)}</td>
                  </tr>
                  <tr>
                    <td>Hi???u bi???t</td>
                    <td>{getValueByKey(key, 9)}</td>
                    <td>Quy???t ??o??n</td>
                    <td>{getValueByKey(key, 10)}</td>
                    <td>Ho?? ?????ng</td>
                    <td>{getValueByKey(key, 11)}</td>
                    <td>B???o d???n</td>
                    <td>{getValueByKey(key, 12)}</td>
                  </tr>
                  <tr>
                    <td>Tri???t h???c</td>
                    <td>{getValueByKey(key, 13)}</td>
                    <td>Th???ng th???n</td>
                    <td>{getValueByKey(key, 14)}</td>
                    <td>Th??ch giao du</td>
                    <td>{getValueByKey(key, 15)}</td>
                    <td>Linh ho???t</td>
                    <td>{getValueByKey(key, 16)}</td>
                  </tr>
                  <tr>
                    <td>S??ng su???t</td>
                    <td>{getValueByKey(key, 17)}</td>
                    <td>C???nh tranh</td>
                    <td>{getValueByKey(key, 18)}</td>
                    <td>???????c y??u m???n</td>
                    <td>{getValueByKey(key, 19)}</td>
                    <td>Th??o v??t</td>
                    <td>{getValueByKey(key, 20)}</td>
                  </tr>
                  <tr>
                    <td>Ph??n t??ch</td>
                    <td>{getValueByKey(key, 21)}</td>
                    <td>K??? lu???t</td>
                    <td>{getValueByKey(key, 22)}</td>
                    <td>Nu??i d?????ng</td>
                    <td>{getValueByKey(key, 23)}</td>
                    <td>S??ng t???o</td>
                    <td>{getValueByKey(key, 24)}</td>
                  </tr>
                  <tr>
                    <td>Logic</td>
                    <td>{getValueByKey(key, 25)}</td>
                    <td>C?? t??? ch???c</td>
                    <td>{getValueByKey(key, 26)}</td>
                    <td>C?? s??? ?????ng c???m</td>
                    <td>{getValueByKey(key, 27)}</td>
                    <td>Nh??n xa tr??ng r???ng</td>
                    <td>{getValueByKey(key, 28)}</td>
                  </tr>
                  <tr>
                    <td>Data-driven</td>
                    <td>{getValueByKey(key, 29)}</td>
                    <td>C?? c???u tr??c</td>
                    <td>{getValueByKey(key, 30)}</td>
                    <td>?????y l??ng tr???c ???n</td>
                    <td>{getValueByKey(key, 31)}</td>
                    <td>C???i m???</td>
                    <td>{getValueByKey(key, 32)}</td>
                  </tr>
                  <tr>
                    <td>Th???c t???</td>
                    <td>{getValueByKey(key, 33)}</td>
                    <td>C?? h??? th???ng</td>
                    <td>{getValueByKey(key, 34)}</td>
                    <td>Trung th??nh</td>
                    <td>{getValueByKey(key, 35)}</td>
                    <td>S??ng su???t</td>
                    <td>{getValueByKey(key, 36)}</td>
                  </tr>
                  <tr>
                    <td>L?? tr??</td>
                    <td>{getValueByKey(key, 37)}</td>
                    <td>C?? ph????ng ph??p</td>
                    <td>{getValueByKey(key, 38)}</td>
                    <td>C???n tr???ng</td>
                    <td>{getValueByKey(key, 39)}</td>
                    <td>T?? m??</td>
                    <td>{getValueByKey(key, 40)}</td>
                  </tr>
                  <tr>
                    <td>T???ng ??i???m</td>
                    <td className={`${maxPoint === maxOne ? "bg-danger" : ""} ${minPoint === maxOne ? "bg-info" : ""}`}>
                      {maxOne}
                    </td>
                    <td>-</td>
                    <td className={`${maxPoint === maxTwo ? "bg-danger" : ""} ${minPoint === maxTwo ? "bg-info" : ""}`}>
                      {maxTwo}
                    </td>
                    <td>-</td>
                    <td className={`${maxPoint === maxThree ? "bg-danger" : ""} ${minPoint === maxThree ? "bg-info" : ""}`}>
                      {maxThree}
                    </td>
                    <td>-</td>
                    <td className={`${maxPoint === maxFour ? "bg-danger" : ""} ${minPoint === maxFour ? "bg-info" : ""}`}>
                      {maxFour}
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
      </div>
    </div>
  );
}

export default AdminPage;
