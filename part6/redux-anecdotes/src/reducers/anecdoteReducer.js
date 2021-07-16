// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)
import anecdotesService from '../service/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.map((anec) =>
        anec.id === action.data ? { ...anec, votes: anec.votes + 1 } : anec
      )
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const votedAnecdote = state.find((anec) => anec.id === action.data)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== action.data ? anecdote : updatedAnecdote
      )
    default:
      return state
  }
}

export const initialitizeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (votedAnecdote) => {
  return async (dispatch) => {
    const anecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    }

    const updatedAnecdote = await anecdotesService.update(anecdote)
    const { id } = updatedAnecdote
    dispatch({
      type: 'VOTE',
      data: id,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default reducer
