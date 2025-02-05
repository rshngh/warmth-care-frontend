import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess, notifyWarn } from "../utils/notify";
import Toast from "../utils/Toast";
import axios from "axios";
import { NavLink } from "react-router-dom";

import womanHoldingTwoHearts from "../assets/womanHoldingTwoHearts.svg";
import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "../lib/axios";

const SignUp = () => {
  const { authUser, signUp } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [picture, setPicture] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfilePicture = async (e) => {
    setIsLoading(true);

    const profilePicture = e.target.files[0];

    const formData = new FormData();
    formData.append("file", profilePicture);
    formData.append("upload_preset", "warmth_care");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/warmthcare/image/upload",
        formData
      );
      if (response.status === 200) {
        setUserData({ ...userData, avatar: response.data.url });
        notifySuccess("Profile picture uploaded successfully.");
      }
    } catch (error) {
      return notifyError("Error uploading avatar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!userData.name) {
      return notifyError("Please enter name.");
    }
    if (!userData.email) {
      return notifyError("Please enter email.");
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      return notifyError("Please enter valid email id.");
    }
    if (!userData.password) {
      return notifyError("Please enter password.");
    }
    if (userData.password.length < 6) {
      return notifyError("Password must be at least 6 characters.");
    }

    if (!userData.avatar) {
      return notifyError("Please choose a profile picture.");
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isFormVerified = validateForm();
    setIsLoading(true);

    if (isFormVerified) {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("avatar", userData.avatar);

      const params = new URLSearchParams(formData);
      try {
        const response = await axiosInstance.post("/user/signup", params);
        signUp(response.data);

        notifySuccess(
          `Congrats ${response.data.name}! Your account has been created successfully.`
        );
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

    setIsLoading(false);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse gap-10">
        <div className="text-left flex-1  ">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">
            Life can be challenging and you don&apos;t have to be alone. We
            believe everyone deserves access to mental health support, and we
            are here to help you find the right path.
          </p>
          <div className="flex justify-center max-w-lg">
            <img
              className=" max-w-xs w-1/3 hidden  lg:block"
              src={womanHoldingTwoHearts}
            />
          </div>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl items-center ">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="name"
                placeholder="name"
                className="input input-bordered"
                required
                value={userData.name}
                onChange={handleInputChange}
              />
            </div>
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
                <span className="label-text-alt">
                  &#40;must be at least 6 characters&#41;
                </span>
              </label>
              <input
                name="password"
                type="text"
                placeholder="password"
                className="input input-bordered"
                required
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Avatar</span>
              </label>
              <input
                name="profilePicture"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered file-input-md w-full max-w-xs"
                onChange={(e) => {
                  handleProfilePicture(e);
                }}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                onClick={handleFormSubmit}>
                {isLoading ? `loading...` : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="text-center pb-6">
            Already have an account?&nbsp;
            <NavLink className="underline" to="/login">
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
