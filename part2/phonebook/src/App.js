import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "913-777-9087" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredContent, setFilteredContent] = useState("");

  const addPerson = (evt) => {
    evt.preventDefault();
    const hasName = persons.map((p) => p.name === newName);
    if (!hasName.includes(true)) {
      const personObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
      };
      setPersons([...persons, personObject]);
    } else {
      alert(`${newName} already exists in phonebook`);
    }
    setNewNumber("");
    setNewName("");
    setFilteredContent("");
  };

  const handleNameChange = (evt) => {
    setNewName(evt.target.value);
  };

  const handleNumberChange = (evt) => {
    setNewNumber(evt.target.value);
  };

  const handleFilteredContent = (evt) => {
    setFilteredContent(evt.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilteredContent={handleFilteredContent} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={persons} filteredContent={filteredContent} />
    </div>
  );
};

export default App;
