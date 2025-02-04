import React from "react";
import notFound from "../assets/notFound.svg";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen place-content-center">
      <div className="card  bg-base-100 max-w-sm m-auto">
        <figure className="px-10 ">
          <img src={notFound} alt="not-found" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="card-title text-4xl ">404! </h1>
          <p>Oops... Page Not Found.</p>
          <div className="card-actions mt-2">
            <NavLink to="/" className="btn btn-primary">
              Go Back Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
