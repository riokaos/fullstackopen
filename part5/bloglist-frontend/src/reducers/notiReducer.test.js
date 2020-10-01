// import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'
import  notificationReducer  from './notiReducer'


describe('notificationReducer', () => {
  test.only('returns new state with action SET_NOTIFICATION', () => {
    const state = []
    const action = {
      type: 'SET_NOTIFICATION',
      data: "hello notification"
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    // expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
    expect(newState).toContainEqual('hello notification')
  })

  test('returns new state with action CLEAR_NOTIFICATION', () => {
    const state = {
      data: "hello notification"
    }
    const action = {
      type: 'CLEAR_NOTIFICATION'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    // expect(newState.length).toBe(1)
    // expect(newState).toContainEqual(action.data)
    expect(newState).toContainEqual('')
  })
})
