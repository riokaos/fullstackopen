// import noteReducer from './noteReducer'
import  notificationReducer  from './notiReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action NEW_NOTIFICATION', () => {
    const state = []
    const action = {
      type: 'SET_NOTIFICATION',
      data:  'the app state is in redux store'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    console.log("newstate", newState);

    expect(newState).toContainEqual({
      data:  'the app state is in redux store'
    })

    // expect(newState).toHaveLength(1)
    // expect(newState).toContainEqual(action.data)
  })
})
