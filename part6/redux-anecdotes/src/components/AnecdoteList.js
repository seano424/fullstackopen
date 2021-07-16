import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes).sort(
    (a, b) => b.votes - a.votes
  )
  const search = useSelector((state) => state.filter)

  const toFilter = search !== ''
  const filteredAnecdotes = toFilter
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(search.toLowerCase())
      )
    : anecdotes

  const vote = (id) => {
    dispatch(upVote(id))
    const votedForMsg = anecdotes.find((anec) => anec.id === id)
    dispatch(createNotification(`You just voted for "${votedForMsg.content}"`))
  }
  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}
