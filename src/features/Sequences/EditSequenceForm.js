import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { patchSequence } from "./sequencesSlice";
import { getToken } from "../Users/userSlice";

export const EditSequenceForm = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sequenceId } = match.params;

  const seq = useSelector((state) =>
    state.sequences.sequences.find((seq_) => seq_.id.toString() === sequenceId)
  );
  const token = useSelector(getToken);

  const [description, setDescription] = useState(seq.description);
  const [species, setSpecies] = useState(seq.species);
  const [sequence, setSequence] = useState(seq.sequence);
  const [type, setType] = useState(seq.type);

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
          token,
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
        <select
          name="type"
          id="sequenceType"
          value={type}
          required
          onChange={onTypeChange}>
          <option value="PROTEIN_FULL">Protein Full</option>
          <option value="PROTEIN_FRAGMENT">Protein Fragment</option>
          <option value="DNA">DNA</option>
          <option value="RNA">RNA</option>
        </select>
        <br />
        <input type="button" value="Save Sequence" onClick={onSaveClick} />
      </form>
    </section>
  );
};
