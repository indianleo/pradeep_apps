import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../pages/counter/counterReducer'

export default configureStore({
  reducer: {
      counter: counterReducer
  }
})