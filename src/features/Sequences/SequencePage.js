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

  const dnaAttributes = sequence["dna_attributes"];

  return (
    <section>
      <article className="sequence">
        <span>
          <h2>{sequence.species}</h2>
          {sequence.userId ? `-by ${sequence.userId}` : null}
        </span>
        <h4>{sequence.description}</h4>
        <p>
          <strong>{sequence.type}: </strong>
          {sequence.sequence}
        </p>
        <section>
          <p>
            <strong>GC Content:</strong> {dnaAttributes["gc_content"]}
          </p>
          <p>
            <strong>Reverse complement:</strong>{" "}
            {dnaAttributes["reverse_complement"]}
          </p>
          <p>
            <strong>RNA Transcription:</strong>{" "}
            {dnaAttributes["rna_transcription"]}
          </p>
        </section>
        <Link to={`/sequences/${sequence.id}/edit`} className="button">
          Edit Sequence
        </Link>
      </article>
    </section>
  );
};
