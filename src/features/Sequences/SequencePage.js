import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SequencePage = ({ match }) => {
  const { sequenceId } = match.params;
  const sequence = useSelector((state) =>
    state.sequences.sequences.find((seq) => seq.id.toString() === sequenceId)
  );

  if (!sequence) {
    return (
      <section>
        <h2>Sequence not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="sequence">
        <h2>{sequence.species}</h2>
        <h4>{sequence.description}</h4>
        <p>{sequence.type}</p>
        <p>{sequence.sequence}</p>
        <Link to={`/sequences/${sequence.id}/edit`} className="button">
          Edit Sequence
        </Link>
      </article>
    </section>
  );
};
