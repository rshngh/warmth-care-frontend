import missWarmth from "../assets/missWarmth.svg";

import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Typewriter from "typewriter-effect";

const PublicHomePage = () => {
  const { authUser } = useAuthStore();
  return (
    <>
      {/* section main starts */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <span className="badge badge-success mb-4">Warmth.Care</span>
            <h1 className="text-5xl font-bold">
              Your confidential online space for
              <span className="text-warning md:text-nowrap ">
                <Typewriter
                  options={{
                    strings: [
                      "mental well-being...",
                      "emotional support...",
                      "",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h1>
            <p className="py-6">
              Find comfort and guidance on your journey towards improved mental
              health.
            </p>
            {authUser ? (
              <NavLink className="btn btn-primary" to="/chat">
                Get Started
              </NavLink>
            ) : (
              <NavLink className="btn btn-primary" to="/login">
                Get Started
              </NavLink>
            )}
          </div>
        </div>
      </div>
      {/* section main ends */}
      {/* section superhero starts */}
      {!authUser && (
        <div className="hero bg-base-100  ">
          <div className="hero-content flex flex-col sm:flex-row col-span-2 md:mt-20 md:mb-20 ">
            <div className="flex-1 p-2">
              <h1 className="text-3xl  font-bold ">
                Discover a new level of mental health support with our AI
                chatbot superhero
              </h1>
              <p className="py-6">
                <span className="text-success"> Warmth.Care </span>offers
                accessible mental health support 24/7. Our innovative chatbot
                uses AI to understand your unique needs and provide personalized
                guidance. Whether you are seeking information about coping
                strategies or just need a listening ear, Miss Warmth is always
                available to chat, answer your questions, and guide you on your
                journey towards mental well-being.
              </p>

              <div className="flex sm:justify-start">
                <NavLink to="/login" className="btn btn-primary">
                  Login
                </NavLink>
                <div className="divider divider-horizontal">OR</div>
                <NavLink to="/signup" className="btn btn-primary">
                  Sign Up
                </NavLink>
              </div>
            </div>
            <div className="card m-auto  ">
              <figure>
                <img className="max-w-xs" src={missWarmth} alt="friends" />
              </figure>
              <div className="card-body">
                <div className="badge badge-secondary">Superhero</div>
                <h2 className="card-title text-success">Miss Warmth</h2>
                <p>Your superhero whenever you need</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* section superhero ends */}
    </>
  );
};

{
  /* section superhero starts */
}
<div className="hero bg-base-100  ">
  <div className="hero-content flex flex-col sm:flex-row col-span-2 md:mt-20 md:mb-20 ">
    <div className="flex-1 p-2">
      <h1 className="text-3xl  font-bold ">
        Discover a new level of mental health support with our AI chatbot
        superhero
      </h1>
      <p className="py-6">
        Life can be challenging.
        <span className="text-success"> Warmth.Care </span>offers accessible
        mental health support 24/7. Our chatbot uses AI to understand your
        unique needs and provide personalized guidance. Whether you are seeking
        information about coping strategies or just need a listening ear, Miss
        Warmth is always available to chat, answer your questions, and guide you
        on your journey towards mental well-being.
      </p>

      <div className="flex sm:justify-start">
        <NavLink to="/login" className="btn btn-primary">
          Log In
        </NavLink>
        <div className="divider divider-horizontal">OR</div>
        <NavLink to="/signup" className="btn btn-primary">
          Sign Up
        </NavLink>
      </div>
    </div>
    <div className="card m-auto w-96 ">
      <figure>
        <img className="" src={missWarmth} alt="friends" />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary">Superhero</div>
        <h2 className="card-title text-success">Miss Warmth</h2>
        <p>Your superhero whenever you need</p>
      </div>
    </div>
  </div>
</div>;
{
  /* section superhero ends */
}

const LoggedInUserHomePage = () => {
  return (
    <div>
      <h1>Logged in User</h1>
    </div>
  );
};

const Homepage = () => {
  const { authUser } = useAuthStore();
  return <>{authUser ? <PublicHomePage /> : <PublicHomePage />}</>;
};

export default Homepage;
