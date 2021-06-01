import React from "react";
import Part from "./Part";

export default function Content({ parts }) {
  return (
    <div>
      {parts.map((p, idx) => (
        <Part key={idx} part={p} />
      ))}
    </div>
  );
}
