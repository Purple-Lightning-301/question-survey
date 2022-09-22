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
        <p>Số người có điểm thấp nhất là lá Bích: {totalCount?.spade}</p>
        <p>Số người có điểm thấp nhất là lá Tép: {totalCount?.club}</p>
        <p>Số người có điểm thấp nhất là lá Rô: {totalCount?.diamond}</p>
        <p>Số người có điểm thấp nhất là lá Tép: {totalCount?.heart}</p>
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
                    <th>Bích</th>
                    <th>2</th>
                    <th>Tép</th>
                    <th>3</th>
                    <th>Cơ</th>
                    <th>4</th>
                    <th>Rô</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Trí tuệ</td>
                    <td>{getValueByKey(key, 1)}</td>
                    <td>Định hướng mục tiêu</td>
                    <td>{getValueByKey(key, 2)}</td>
                    <td>Cổ vũ viên</td>
                    <td>{getValueByKey(key, 3)}</td>
                    <td>Mạo hiểm</td>
                    <td>{getValueByKey(key, 4)}</td>
                  </tr>
                  <tr>
                    <td>Chuyên gia</td>
                    <td>{getValueByKey(key, 5)}</td>
                    <td>Thúc đẩy</td>
                    <td>{getValueByKey(key, 6)}</td>
                    <td>Ngoại giao</td>
                    <td>{getValueByKey(key, 7)}</td>
                    <td>Tự phát</td>
                    <td>{getValueByKey(key, 8)}</td>
                  </tr>
                  <tr>
                    <td>Hiểu biết</td>
                    <td>{getValueByKey(key, 9)}</td>
                    <td>Quyết đoán</td>
                    <td>{getValueByKey(key, 10)}</td>
                    <td>Hoà đồng</td>
                    <td>{getValueByKey(key, 11)}</td>
                    <td>Bạo dạn</td>
                    <td>{getValueByKey(key, 12)}</td>
                  </tr>
                  <tr>
                    <td>Triết học</td>
                    <td>{getValueByKey(key, 13)}</td>
                    <td>Thẳng thắn</td>
                    <td>{getValueByKey(key, 14)}</td>
                    <td>Thích giao du</td>
                    <td>{getValueByKey(key, 15)}</td>
                    <td>Linh hoạt</td>
                    <td>{getValueByKey(key, 16)}</td>
                  </tr>
                  <tr>
                    <td>Sáng suốt</td>
                    <td>{getValueByKey(key, 17)}</td>
                    <td>Cạnh tranh</td>
                    <td>{getValueByKey(key, 18)}</td>
                    <td>Được yêu mến</td>
                    <td>{getValueByKey(key, 19)}</td>
                    <td>Tháo vát</td>
                    <td>{getValueByKey(key, 20)}</td>
                  </tr>
                  <tr>
                    <td>Phân tích</td>
                    <td>{getValueByKey(key, 21)}</td>
                    <td>Kỷ luật</td>
                    <td>{getValueByKey(key, 22)}</td>
                    <td>Nuôi dưỡng</td>
                    <td>{getValueByKey(key, 23)}</td>
                    <td>Sáng tạo</td>
                    <td>{getValueByKey(key, 24)}</td>
                  </tr>
                  <tr>
                    <td>Logic</td>
                    <td>{getValueByKey(key, 25)}</td>
                    <td>Có tổ chức</td>
                    <td>{getValueByKey(key, 26)}</td>
                    <td>Có sự đồng cảm</td>
                    <td>{getValueByKey(key, 27)}</td>
                    <td>Nhìn xa trông rộng</td>
                    <td>{getValueByKey(key, 28)}</td>
                  </tr>
                  <tr>
                    <td>Data-driven</td>
                    <td>{getValueByKey(key, 29)}</td>
                    <td>Có cấu trúc</td>
                    <td>{getValueByKey(key, 30)}</td>
                    <td>Đầy lòng trắc ẩn</td>
                    <td>{getValueByKey(key, 31)}</td>
                    <td>Cởi mở</td>
                    <td>{getValueByKey(key, 32)}</td>
                  </tr>
                  <tr>
                    <td>Thực tế</td>
                    <td>{getValueByKey(key, 33)}</td>
                    <td>Có hệ thống</td>
                    <td>{getValueByKey(key, 34)}</td>
                    <td>Trung thành</td>
                    <td>{getValueByKey(key, 35)}</td>
                    <td>Sáng suốt</td>
                    <td>{getValueByKey(key, 36)}</td>
                  </tr>
                  <tr>
                    <td>Lí trí</td>
                    <td>{getValueByKey(key, 37)}</td>
                    <td>Có phương pháp</td>
                    <td>{getValueByKey(key, 38)}</td>
                    <td>Cẩn trọng</td>
                    <td>{getValueByKey(key, 39)}</td>
                    <td>Tò mò</td>
                    <td>{getValueByKey(key, 40)}</td>
                  </tr>
                  <tr>
                    <td>Tổng điểm</td>
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
