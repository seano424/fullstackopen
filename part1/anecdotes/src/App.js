import React, { useState } from "react";
import Description from "./components/Description";

const App = () => {
  let anecdotes = [
    {
      name: "If it hurts, do it more often",
      votes: 0,
    },
    {
      name: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      name: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      name: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    {
      name: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    {
      name: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      name: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
      votes: 0,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const randNum = () => {
    let num = Math.floor(Math.random() * anecdotes.length);
    return num === selected ? randNum() : num;
  };

  const handleNextAnecdote = () => {
    setSelected(randNum);
  };

  const handleVote = () => {
    const vote = [...votes];
    vote[selected] += 1;
    setVotes(vote);
  };

  const maxVotes = Math.max.apply(0, votes);

  return (
    <div>
      <Description
        title="Anecdote of the day"
        text={anecdotes[selected].name}
        votes={votes[selected]}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>see another</button>
      <Description
        title="Anecdote with most votes"
        text={anecdotes[votes.indexOf(maxVotes)].name}
        votes={maxVotes}
      />
    </div>
  );
};

export default App;
