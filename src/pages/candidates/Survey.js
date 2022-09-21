import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { database } from "../../firebase";
import { resultAtom, userAtom } from "../../user.recoil";
import { getDatabase, ref, set } from "firebase/database";

function Survey(props) {
  const user = useRecoilValue(userAtom);
  const db = database;
  const setResultRecoil = useSetRecoilState(resultAtom);
  const navigate = useNavigate();

  const [result, setResult] = useState([]);

  const handleChangeResult = (key, value) => {
    if (value && (value < 1 || value > 4)) {
      return;
    }
    let resultState = [...result];
    let objIndex = resultState.findIndex((r) => r.key === key);

    if (objIndex !== -1) {
      resultState[objIndex].value = value;
    } else {
      resultState = [...resultState, { key, value }];
    }

    setResult(resultState);
  };

  const submit = () => {
    if (result?.length < 40) {
      alert("Please enter all the answers!");
      return;
    }
    if (result?.some((r) => r.value === "")) {
      alert("Please enter all the answers!");
      return;
    }
    setResultRecoil(result);
    set(ref(db, "users/" + user), {
      name: user,
      result: result
    })
      .then(() => {
        // Data saved successfully!
        console.log('successful');
      })
      .catch((error) => {
        // The write failed...
      });
    navigate("/ket-qua");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <table className="table table-striped">
        <thead>
          <tr>
            <th colSpan="8" className="text-center">
              Trong mỗi hàng NGANG hãy đánh điểm từ 1-4 cho những mô tả cung
              cách giống bạn (1: giống nhất - 4: ít giống nhất)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trí tuệ</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(1, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 1)
                    ? result.find((r) => r.key === 1).value
                    : ""
                }
              ></input>
            </td>
            <td>Định hướng mục tiêu</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(2, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 2)
                    ? result.find((r) => r.key === 2).value
                    : ""
                }
              ></input>
            </td>
            <td>Cổ vũ viên</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(3, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 3)
                    ? result.find((r) => r.key === 3).value
                    : ""
                }
              ></input>
            </td>
            <td>Mạo hiểm</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(4, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 4)
                    ? result.find((r) => r.key === 4).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Chuyên gia</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(5, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 5)
                    ? result.find((r) => r.key === 5).value
                    : ""
                }
              ></input>
            </td>
            <td>Thúc đẩy</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(6, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 6)
                    ? result.find((r) => r.key === 6).value
                    : ""
                }
              ></input>
            </td>
            <td>Ngoại giao</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(7, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 7)
                    ? result.find((r) => r.key === 7).value
                    : ""
                }
              ></input>
            </td>
            <td>Tự phát</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(8, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 8)
                    ? result.find((r) => r.key === 8).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Hiểu biết</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(9, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 9)
                    ? result.find((r) => r.key === 9).value
                    : ""
                }
              ></input>
            </td>
            <td>Quyết đoán</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(10, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 10)
                    ? result.find((r) => r.key === 10).value
                    : ""
                }
              ></input>
            </td>
            <td>Hoà đồng</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(11, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 11)
                    ? result.find((r) => r.key === 11).value
                    : ""
                }
              ></input>
            </td>
            <td>Bạo dạn</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(12, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 12)
                    ? result.find((r) => r.key === 12).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Triết học</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(13, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 13)
                    ? result.find((r) => r.key === 13).value
                    : ""
                }
              ></input>
            </td>
            <td>Thẳng thắn</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(14, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 14)
                    ? result.find((r) => r.key === 14).value
                    : ""
                }
              ></input>
            </td>
            <td>Thích giao du</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(15, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 15)
                    ? result.find((r) => r.key === 15).value
                    : ""
                }
              ></input>
            </td>
            <td>Linh hoạt</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(16, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 16)
                    ? result.find((r) => r.key === 16).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Sáng suốt</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(17, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 17)
                    ? result.find((r) => r.key === 17).value
                    : ""
                }
              ></input>
            </td>
            <td>Cạnh tranh</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(18, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 18)
                    ? result.find((r) => r.key === 18).value
                    : ""
                }
              ></input>
            </td>
            <td>Được yêu mến</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(19, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 19)
                    ? result.find((r) => r.key === 19).value
                    : ""
                }
              ></input>
            </td>
            <td>Tháo vát</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(20, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 20)
                    ? result.find((r) => r.key === 20).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Phân tích</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(21, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 21)
                    ? result.find((r) => r.key === 21).value
                    : ""
                }
              ></input>
            </td>
            <td>Kỷ luật</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(22, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 22)
                    ? result.find((r) => r.key === 22).value
                    : ""
                }
              ></input>
            </td>
            <td>Nuôi dưỡng</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(23, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 23)
                    ? result.find((r) => r.key === 23).value
                    : ""
                }
              ></input>
            </td>
            <td>Sáng tạo</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(24, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 24)
                    ? result.find((r) => r.key === 24).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Logic</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(25, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 25)
                    ? result.find((r) => r.key === 25).value
                    : ""
                }
              ></input>
            </td>
            <td>Có tổ chức</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(26, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 26)
                    ? result.find((r) => r.key === 26).value
                    : ""
                }
              ></input>
            </td>
            <td>Có sự đồng cảm</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(27, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 27)
                    ? result.find((r) => r.key === 27).value
                    : ""
                }
              ></input>
            </td>
            <td>Nhìn xa trông rộng</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(28, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 28)
                    ? result.find((r) => r.key === 28).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Data-driven</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(29, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 29)
                    ? result.find((r) => r.key === 29).value
                    : ""
                }
              ></input>
            </td>
            <td>Có cấu trúc</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(30, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 30)
                    ? result.find((r) => r.key === 30).value
                    : ""
                }
              ></input>
            </td>
            <td>Đầy lòng trắc ẩn</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(31, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 31)
                    ? result.find((r) => r.key === 31).value
                    : ""
                }
              ></input>
            </td>
            <td>Cởi mở</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(32, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 32)
                    ? result.find((r) => r.key === 32).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Thực tế</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(33, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 33)
                    ? result.find((r) => r.key === 33).value
                    : ""
                }
              ></input>
            </td>
            <td>Có hệ thống</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(34, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 34)
                    ? result.find((r) => r.key === 34).value
                    : ""
                }
              ></input>
            </td>
            <td>Trung thành</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(35, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 35)
                    ? result.find((r) => r.key === 35).value
                    : ""
                }
              ></input>
            </td>
            <td>Sáng suốt</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(36, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 36)
                    ? result.find((r) => r.key === 36).value
                    : ""
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Lí trí</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(37, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 37)
                    ? result.find((r) => r.key === 37).value
                    : ""
                }
              ></input>
            </td>
            <td>Có phương pháo</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(38, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 38)
                    ? result.find((r) => r.key === 38).value
                    : ""
                }
              ></input>
            </td>
            <td>Cẩn trọng</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(39, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 39)
                    ? result.find((r) => r.key === 39).value
                    : ""
                }
              ></input>
            </td>
            <td>Tò mò</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  handleChangeResult(40, e.target.value);
                }}
                value={
                  result.find((r) => r.key === 40)
                    ? result.find((r) => r.key === 40).value
                    : ""
                }
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={submit}>
        Xác nhận
      </button>
    </div>
  );
}

export default Survey;
