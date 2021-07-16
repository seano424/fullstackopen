export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        delay: setTimeout(() => {
          dispatch(deleteNotification())
        }, delay * 1000),
      },
    })
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.delay)
      return action.data.message
    case 'DELETE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default reducer
