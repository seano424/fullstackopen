import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  console.log("render", notes.length, "notes");

  return <div className="App"></div>;
}

export default App;
