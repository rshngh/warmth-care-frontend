import { useState } from "react";
import { notifyError, notifySuccess, notifyWarn } from "../utils/notify";
import axios from "axios";
import Toast from "../utils/Toast";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import manWelcoming from "../assets/manWelcoming.svg";
import { useAuthStore } from "../store/useAuthStore";

const LogIn = () => {
  const { logIn } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const fillTestLoginInfo = () => {
    setUserData({
      email: "test@test.com",
      password: "test123",
    });
  };

  const logInHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userData.email || !userData.password) {
      notifyWarn("Fields are empty.");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", userData.email);
      formData.append("password", userData.password);

      //axios serializes data to json but formdata is multipart/formdata so use URLSearchParams api
      try {
        const params = new URLSearchParams(formData);
        const response = await axiosInstance.post("/user/login", params);
        if (response) {
          notifySuccess("Logged in successfully.");
          logIn(response.data);
          navigate("/");
        }
      } catch (error) {
        if (error.message === "Network Error") {
          notifyError(`${error.message}. Please retry after sometime.`);
        } else {
          notifyError(error.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-left ">
          <h1 className="text-5xl font-bold">Login Now!</h1>
          <p className="py-6">
            Welcome back to your confidential online space for mental well-being
            and emotional support.
          </p>
          <div className="flex justify-center">
            <img
              className="max-w-xs w-1/3 hidden lg:block"
              src={manWelcoming}
            />
          </div>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={userData.password}
                onChange={handleInputChange}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!userData.email || !userData.password || isLoading}
                onClick={logInHandler}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="">
            <div className="divider px-2">or</div>
            <div className="card-body ">
              <button className="btn btn-primary" onClick={fillTestLoginInfo}>
                Continue Incognito
              </button>
              <label className="label label-text-alt">
                *Login using guest account credentials
                <br />
                *Conversations are deleted when you logout
              </label>
            </div>
          </div>

          <div className="text-center pb-6">
            Don&apos;t have an account? &nbsp;
            <NavLink className="underline" to="/signup">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default LogIn;
