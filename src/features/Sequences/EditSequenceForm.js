import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { patchSequence } from "./sequencesSlice";

export const EditSequenceForm = ({ match }) => {
  const { sequenceId } = match.params;
  const seq = useSelector((state) =>
    state.sequences.sequences.find((seq_) => String(seq_.id) === sequenceId)
  );

  const [description, setDescription] = useState(seq.description);
  const [species, setSpecies] = useState(seq.species);
  const [sequence, setSequence] = useState(seq.sequence);
  const [type, setType] = useState(seq.type);

  const dispatch = useDispatch();
  const history = useHistory();

  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onSpeciesChange = (e) => setSpecies(e.target.value);
  const onSequenceChange = (e) => setSequence(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);

  const onSaveClick = () => {
    if (description && species && sequence && type) {
      dispatch(
        patchSequence({
          id: sequenceId,
          description,
          species,
          sequence,
          type,
        })
      );
      history.push(`/sequences/${sequenceId}`);
    }
  };

  return (
    <section>
      <h2>Edit sequence:</h2>
      <form>
        <label htmlFor="sequenceDescription">Description: </label>
        <input
          type="text"
          id="sequenceDescription"
          name="sequenceDescription"
          value={description}
          onChange={onDescriptionChange}
        />
        <br />
        <label htmlFor="sequenceSpecies">Species: </label>
        <input
          type="text"
          id="sequenceSpecies"
          name="sequenceSpecies"
          value={species}
          onChange={onSpeciesChange}
        />
        <br />
        <label htmlFor="sequenceSequence">Sequence: </label>
        <input
          type="text"
          id="sequenceSequence"
          name="sequenceSequence"
          value={sequence}
          onChange={onSequenceChange}
        />
        <br />
        <label htmlFor="sequenceType">Type: </label>
        <input
          type="text"
          id="sequenceType"
          name="sequenceType"
          value={type}
          onChange={onTypeChange}
        />
        <br />
        <input type="button" value="Save Sequence" onClick={onSaveClick} />
      </form>
    </section>
  );
};
