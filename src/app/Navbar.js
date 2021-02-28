import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { isUserLoggedIn } from "../features/Users/userSlice";

export const Navbar = () => {
  const loggedIn = useSelector(isUserLoggedIn);
  return (
    <nav>
      <section>
        <div className="navContent">
          <h1>genome_sequencer</h1>
          <div className="navLinks">
            <Link className="navLink" to="/">
              Posts
            </Link>
            {loggedIn ? (
              <>
                <Link className="navLink" to="/home">
                  Home
                </Link>
                <Link className="navLink" to="/logout">
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link className="navLink" to="/signup">
                  Sign Up
                </Link>
                <Link className="navLink" to="/login">
                  Login
                </Link>
              </>
            )}

            <Link className="navLink" to="#">
              About
            </Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
