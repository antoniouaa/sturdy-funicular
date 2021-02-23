import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { sequenceAdded } from "./sequencesSlice";
import { postSequence } from "./sequencesSlice";

export const AddSequenceForm = () => {
  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [sequence, setSequence] = useState("");
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onSpeciesChange = (e) => setSpecies(e.target.value);
  const onSequenceChange = (e) => setSequence(e.target.value);
  const onTypeChange = (e) => setType(e.target.value);

  const onAuthorChange = (e) => setUserId(e.target.value);

  const onSaveClick = () => {
    if (description && species && sequence && type) {
      dispatch(
        postSequence({
          description: description,
          species: species,
          sequence: sequence.toUpperCase(),
          type: type.toUpperCase(),
          userId: Boolean(userId) ? userId : "anon",
        })
      );
      setDescription("");
      setSpecies("");
      setSequence("");
      setType("");
    }
  };

  const canSave =
    Boolean(description) &&
    Boolean(species) &&
    Boolean(sequence) &&
    Boolean(type) &&
    Boolean(userId);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  return (
    <section>
      <h2>Add new sequence:</h2>
      <form>
        <label htmlFor="sequenceAuthor">Author: </label>
        <select id="sequenceAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
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
        <input
          type="text"
          id="sequenceType"
          name="sequenceType"
          value={type}
          onChange={onTypeChange}
        />
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
