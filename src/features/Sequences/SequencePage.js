import React from "react";
import { useSelector } from "react-redux";

export const SequencePage = ({ match }) => {
  const { sequenceId } = match.params;
  const sequence = useSelector((state) =>
    state.sequences.find((seq) => seq.id === sequenceId)
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
      </article>
    </section>
  );
};
