import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <section>
        <div className="navContent">
          <h1>genome_sequencer</h1>
          <div className="navLinks">
            <Link className="navLink" to="/">
              Posts
            </Link>
            <Link className="navLink" to="#">
              About
            </Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
