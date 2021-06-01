import React from "react";

export default function Description({ title, text, votes }) {
  return (
    <>
      <h1>{title}</h1>
      <div style={{ height: "3em" }}>
        {text} has {votes} votes
      </div>
    </>
  );
}
