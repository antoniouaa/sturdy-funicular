import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SequencesList = () => {
  const sequences = useSelector((state) => state.sequences);

  const renderedSequences = sequences.map((sequence, idx) => (
    <div className="sequence-excerpt" key={idx}>
      <h3>{sequence.description}</h3>
      <p>
        {sequence.species} - Type: {sequence.type}
      </p>
      <p className="sequence-content">{sequence.sequence.toUpperCase()}</p>
      <Link to={`/sequences/${sequence.id}`} className="button muted-button">
        View Sequence
      </Link>
    </div>
  ));

  return (
    <section className="sequences-list">
      <h2>Sequences</h2>
      {renderedSequences}
    </section>
  );
};
