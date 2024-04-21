import React, { useState, useEffect } from "react";
import {Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css"; // Import the CSS file here
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
     <div className="login-box">
     {loading && <Spinner />}
     <Form layout="vertical" onFinish={submitHandler}>
    <h2>Login</h2>
      <div className="user-box">
      <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Email"/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password"  placeholder="Password" />
          </Form.Item>
        <div className="d-flex justify-content-between">
            <Link to="/register">Not a user ? Cleck Here to regsiter</Link>
            <button className="btn btn-primary"> 
      <span />
      <span />
      <span />
      <span />
      Login
      </button>
          </div>
      </div>
     
    </Form>
</div>

    </>
  );
};

export default Login;
