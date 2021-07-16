import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const delay = 5
  const notification = useSelector((state) => state.notifications)
  useEffect(() => {
    let timer1 = setTimeout(() => {
      dispatch(deleteNotification())
    }, delay * 1000)
    return () => {
      clearTimeout(timer1)
    }
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <>{notification !== '' && <div style={style}>{notification}</div>}</>
}

export default Notification
