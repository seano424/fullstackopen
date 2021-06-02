import React from "react";

export default function Persons({ persons, filteredContent }) {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(
        (person, idx) =>
          person.name.toLowerCase().includes(filteredContent.toLowerCase()) && (
            <div key={idx}>
              {person.name} {person.number}
            </div>
          )
      )}
    </>
  );
}
