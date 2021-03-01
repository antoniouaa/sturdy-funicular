import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postSequence } from "./sequencesSlice";
import { isUserLoggedIn, getToken } from "../Users/userSlice";

export const AddSequenceForm = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isUserLoggedIn, shallowEqual);
  const token = useSelector(getToken);
  const history = useHistory();

  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [sequence, setSequence] = useState("");
  const [type, setType] = useState("");

  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onSpeciesChange = (e) => setSpecies(e.target.value);
  const onSequenceChange = (e) => setSequence(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);

  const onSaveClick = () => {
    if (description && species && sequence && type) {
      if (loggedIn) {
        dispatch(
          postSequence({
            description: description,
            species: species,
            sequence: sequence.toUpperCase(),
            type: type.toUpperCase(),
            token,
          })
        );
        clearFields();
      } else {
        alert("You are not logged in!");
        clearFields();
        history.push("/login");
      }
    }
  };

  const clearFields = () => {
    setDescription("");
    setSpecies("");
    setSequence("");
    setType("");
  };

  const canSave =
    Boolean(description) &&
    Boolean(species) &&
    Boolean(sequence) &&
    Boolean(type);

  return (
    <section>
      <h2>Add new sequence:</h2>
      <form>
        <br />
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
          id="type-select"
          required
          value={type}
          onChange={onTypeChange}>
          <option value="PROTEIN_FULL">Protein Full</option>
          <option value="PROTEIN_FRAGMENT">Protein Fragment</option>
          <option value="DNA">DNA</option>
          <option value="RNA">RNA</option>
        </select>
        <br />
        <input
          type="button"
          value="Save Sequence"
          disabled={!canSave}
          onClick={onSaveClick}
        />
      </form>
    </section>
  );
};
