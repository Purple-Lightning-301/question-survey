import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../user.recoil";

function Naming(props) {
  const [user,setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    name: "",
    password: "",
  });

  const handleChangeUserName = (e) => {
    setUserLogin((prevUserLogin) => {
      return { ...prevUserLogin, name: e.target.value };
    });
  };

  const handleChangePassword = (e) => {
    setUserLogin((prevUserLogin) => {
      return { ...prevUserLogin, password: e.target.value };
    });
  };

  useEffect(() => {
    if(user) {
      if(user === 'nhanct.ftu.admin') {
        navigate('/admin')
      } else {
        navigate('/khao-sat')
      }
    }
  }, [user])

  const submit = (e) => {
    e.preventDefault();
    if(userLogin?.name === 'nhanct.ftu.admin' && userLogin?.password === 'admin') {
      setUser(userLogin?.name);
      localStorage.setItem('username', userLogin?.name)
    } else if(userLogin?.name !== 'nhanct.ftu.admin') {
      setUser(userLogin?.name);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Điền tên của bạn
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            value={userLogin?.name}
            onChange={handleChangeUserName}
          ></input>
        </div>
        {userLogin?.name === "nhanct.ftu.admin" && (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={userLogin?.password}
              onChange={handleChangePassword}
            ></input>
          </div>
        )}
        <button className="btn btn-primary" onClick={submit}>
          Xác nhận
        </button>
      </form>
    </div>
  );
}

export default Naming;
