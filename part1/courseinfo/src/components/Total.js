import React from "react";

export default function Total({ parts }) {
  const exercises = parts.map((p) => p.exercises);
  const total = exercises.reduce((acc, cur) => acc + cur);
  return <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>;
}
