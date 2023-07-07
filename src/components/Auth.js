import { useState, useContext  } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username,
      password,
    };

    axios.post(register ? `/register` : `/login`, body)
    .then(({data}) =>{
        authCtx.login(data.token, data.exp, data.userId)
        console.log("after auth submit", data)})
    .catch(err => {
        setUsername('')
        setPassword('')
        alert(err.response.data)
    });
    console.log("submitHandler called");
  };

  const registerBtnHandler = () => {
    if (register) {
      setRegister(false);
    } else {
      setRegister(true);
    }
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={registerBtnHandler}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
