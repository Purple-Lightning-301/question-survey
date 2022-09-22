import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { teamleadAtom, userAtom } from "../user.recoil";

function Naming(props) {
  const [user, setUser] = useRecoilState(userAtom);
  const [teamLead, setTeamLead] = useRecoilState(teamleadAtom);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    name: "",
    password: "",
    teamlead: "",
    error: "",
  });

  const handleChangeUserName = (e) => {
    setUserLogin((prevUserLogin) => {
      return { ...prevUserLogin, name: e.target.value, error: "" };
    });
  };

  const handleChangePassword = (e) => {
    setUserLogin((prevUserLogin) => {
      return { ...prevUserLogin, password: e.target.value, error: "" };
    });
  };

  const handleChangeTeamlead = (e) => {
    setUserLogin((prevUserLogin) => {
      return { ...prevUserLogin, teamlead: e.target.value, error: "" };
    });
  };

  useEffect(() => {
    if (user) {
      if (user === "nhanct.ftu.admin") {
        navigate("/admin");
      } else {
        navigate("/khao-sat");
      }
    }
  }, [user]);

  const submit = (e) => {
    e.preventDefault();
    if (userLogin?.username === "" || (userLogin?.teamlead === "" && userLogin?.name !== "nhanct.ftu.admin" )) {
      setUserLogin((prevUserLogin) => {
        return { ...prevUserLogin, error: "Nhập đủ thông tin" };
      });
      return;
    }
    if (
      userLogin?.name === "nhanct.ftu.admin" &&
      userLogin?.password === "admin"
    ) {
      setUser(userLogin?.name);
      localStorage.setItem("username", userLogin?.name);
    } else if (userLogin?.name !== "nhanct.ftu.admin") {
      setUser(userLogin?.name);
      setTeamLead(userLogin?.teamlead);
    }
  };

  return (
    <React.Fragment>
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
          {userLogin?.name !== "nhanct.ftu.admin" && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Điền tên Teamlead của bạn
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="name"
                value={userLogin?.teamlead}
                onChange={handleChangeTeamlead}
              ></input>
            </div>
          )}
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
          {userLogin?.error && (
            <p className="text-center text-danger mt-4">{userLogin?.error}</p>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}

export default Naming;
