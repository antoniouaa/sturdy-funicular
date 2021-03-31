import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSequences, selectAllSequences } from "./sequencesSlice";

export const SequencesList = () => {
  const dispatch = useDispatch();
  const sequences = useSelector(selectAllSequences);
  const sequenceStatus = useSelector((state) => state.sequences.status);

  useEffect(() => {
    if (sequenceStatus === "idle") {
      dispatch(fetchSequences());
    }
  }, [sequenceStatus, dispatch]);

  const renderedSequences = sequences.map((seq, idx) => (
    <div className="sequence-excerpt" key={idx}>
      <h3>{seq.description}</h3>
      <p>
        {seq.species} - Type: {seq.type}
      </p>
      <p className="sequence-content">
        {seq.sequence.toUpperCase().slice(0, 150)}
        {seq.sequence.length > 150 ? "..." : null}
      </p>
      <Link to={`/sequences/${seq.id}`} className="button muted-button">
        View Sequence
      </Link>
    </div>
  ));

  return (
    <div className="sequences-list">
      <h1>Sequences</h1>
      <section>
        {Boolean(sequences)
          ? renderedSequences
          : "No sequences in the database"}
      </section>
    </div>
  );
};
