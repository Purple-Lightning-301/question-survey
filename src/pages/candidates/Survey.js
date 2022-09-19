import React from "react";

function Survey(props) {
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
              <input type="text"></input>
            </td>
            <td>Định hướng mục tiêu</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Cổ vũ viên</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Mạo hiểm</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Chuyên gia</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Thúc đẩy</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Ngoại giao</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Tự phát</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Hiểu biết</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Quyết đoán</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Hoà đồng</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Bạo dạn</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Triết học</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Thẳng thắn</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Thích giao du</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Linh hoạt</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Sáng suốt</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Cạnh tranh</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Được yêu mến</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Tháo vát</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Phân tích</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Kỷ luật</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Nuôi dưỡng</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Sáng tạo</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Logic</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Có tổ chức</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Có sự đồng cảm</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Nhìn xa trông rộng</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Data-driven</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Có cấu trúc</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Đầy lòng trắc ẩn</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Cởi mở</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Thực tế</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Có hệ thống</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Trung thành</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Sáng suốt</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>Lí trí</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Có phương pháo</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Cẩn trọng</td>
            <td>
              <input type="text"></input>
            </td>
            <td>Tò mò</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary">Xác nhận</button>
    </div>
  );
}

export default Survey;
