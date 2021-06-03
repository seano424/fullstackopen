import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredContent, setFilteredContent] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (evt) => {
    evt.preventDefault();
    const hasName = persons.map(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    if (!hasName.includes(true)) {
      const personObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
      };
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons([...persons, personObject]));
      setNewNumber("");
      setNewName("");
      setFilteredContent("");
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Change the number with a new one?`
        )
      ) {
        // console.log("confirming", newNumber, newName);
        const foundPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedPerson = { ...foundPerson, number: newNumber };
        // console.log(updatedPerson);
        personService
          .update(foundPerson.id, updatedPerson)
          .then((res) => {
            setPersons(
              persons.map((person) => (person.id === res.id ? res : person))
            );
          })
          .catch((error) => console.log(error));

        setNewNumber("");
        setNewName("");
        setFilteredContent("");
      } else {
        console.log("not updating...");
      }
    }
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

  const handleDelete = (person) => {
    personService.destroy(person.id).then((res) => {
      setPersons(persons.filter((p) => p.id !== person.id));
    });
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
      <Persons
        persons={persons}
        filteredContent={filteredContent}
        deleteBtn={handleDelete}
      />
    </div>
  );
};

export default App;
