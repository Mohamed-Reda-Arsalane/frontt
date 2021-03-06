import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
async function get1(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}
async function post1(url, username1, password) {
  const json = JSON.stringify({
    Username: username1,
    Password: password,
    Wins: 0,
  });
  const res = await axios.post(url, json, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const Login = () => {
  var CryptoJS = require("crypto-js");
  const [users, setUsers] = useState([]);
  async function reload() {
    let data = await get1("https://azertyha78.pythonanywhere.com/user");
    setUsers(data);
  }
  const [usernamelogin, setUsernamelogin] = useState("");
  function onChangeusername1(e) {
    setUsernamelogin(e.target.value);
  }
  const [passwordlogin, setPasswordlogin] = useState("");
  function onChangeusername2(e) {
    setPasswordlogin(e.target.value);
  }
  function onlogin(usernamelogin1, passwordlogin1) {
    const rand = "randomizer";
    const encrypt = (content, randi) =>
      CryptoJS.AES.encrypt(JSON.stringify({ content }), randi).toString();

    const decrypt = (crypted, randi) =>
      JSON.parse(
        CryptoJS.AES.decrypt(crypted, randi).toString(CryptoJS.enc.Utf8)
      ).content;

    var state = false;
    for (var i = 0; i < users.length; i++) {
      var obj = users[i];
      if (usernamelogin1 === obj["Username"]) {
        if (passwordlogin1 === obj["Password"]) {
          for (var i = 0; i < users.length; i++) {
            if (users[i]["Username"] == usernamelogin1) {
              var encri = encrypt(users[i]["User_ID"], rand);
            }
          }
          var decrypted = decrypt(encri, rand);
          window.location = "/Dashboard/" + encri;
          state = true;
        }
      }
    }
    if (!state) {
      alert("Try again!");
    }
  }

  async function set_to_online(user) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        User_ID: user["User_ID"],
        Username: user["Username"],
        Password: user["Password"],
        Is_online: true,
      }),
    };
  }
  return (
    <div
      id="r"
      style={{ display: "flex", justifyContent: "center", textalign: "center" }}
    >
      <div>
        <br />
        <br />
        <br />
        <br />
        <div className="display_center">
          <form>
            <div
              className="p-5 rounded "
              style={{ backgroundColor: "rgba(32, 41, 69, 0.4)" }}
            >
              <h3
                className="m-3 d-flex justify-content-center"
                style={{ color: "white" }}
              >
                Login
              </h3>
              <h6 style={{ color: "white" }}>Username :</h6>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="usernamelogin"
                required
                onChange={onChangeusername1}
              />
              <br />
              <h6 style={{ color: "white" }}>Password :</h6>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="passwordlogin"
                required
                onChange={onChangeusername2}
              />
              <br />
              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onlogin(usernamelogin, passwordlogin)}
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />
    </div>
  );
};

export default Login;
