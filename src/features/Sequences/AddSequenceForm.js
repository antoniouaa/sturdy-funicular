import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { sequenceAdded } from "./sequencesSlice";

export const AddSequenceForm = () => {
  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [sequence, setSequence] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onSpeciesChange = (e) => setSpecies(e.target.value);
  const onSequenceChange = (e) => setSequence(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);

  const onSaveClick = () => {
    if (description && species && sequence && type) {
      dispatch(
        sequenceAdded({
          id: nanoid(),
          description,
          species,
          sequence,
          type,
        })
      );
      setDescription("");
      setSpecies("");
      setSequence("");
      setType("");
    }
  };

  return (
    <section>
      <h2>Add new sequence:</h2>
      <form>
        <label htmlFor="sequenceDescription">Description: </label>
        <input
          type="text"
          id="sequenceDescription"
          name="sequenceDescription"
          value={description}
          onChange={onDescriptionChange}
        />
        <label htmlFor="sequenceSpecies">Species: </label>
        <input
          type="text"
          id="sequenceSpecies"
          name="sequenceSpecies"
          value={species}
          onChange={onSpeciesChange}
        />
        <label htmlFor="sequenceSequence">Sequence: </label>
        <input
          type="text"
          id="sequenceSequence"
          name="sequenceSequence"
          value={sequence}
          onChange={onSequenceChange}
        />
        <label htmlFor="sequenceType">Type: </label>
        <input
          type="text"
          id="sequenceType"
          name="sequenceType"
          value={type}
          onChange={onTypeChange}
        />
        <input type="button" value="Save Sequence" onClick={onSaveClick} />
      </form>
    </section>
  );
};
