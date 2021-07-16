export const createNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
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
      return action.data
    case 'DELETE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default reducer
