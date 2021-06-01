import React from "react";

export default function Statistics({ text, value }) {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ minWidth: "5em" }}>{text}</td>
          <td>
            {isNaN(value) ? 0 : value} {text === "positive" && "%"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
