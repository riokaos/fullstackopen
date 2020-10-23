import loginReducer from './loginReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action LOG_IN', () => {
    const state = []
    const action = {
      type: 'LOGIN_SUCCESS',
      data: {
        token: 'AEWWREASD',
        name: 'name testing',
        username: 'testuser',
      }
    }

    deepFreeze(state)
    const newState = loginReducer(state, action)
    // console.log("newState **:",typeof newState);
    // console.log("state orig:", state);
    // console.log("state:", newState);
    // console.log("action data:", action.data);


    // expect(newState.length).toBe(1)
    expect(newState).toMatchObject(action.data)
  })

test('delete works REMOVE_BLOG', () => {
    const state = [{        token: 'AEWWREASD',
      name: 'name testing',
      username: 'testuser',
    }]
    const action = {
      type: 'LOGOUT_USER',
      data: null
    }

    deepFreeze(state)
    const newState = loginReducer(state, action)
    // console.log("newState **:",typeof newState.length);
    console.log("state::", state);
    console.log("newState::", newState);
    console.log("action::", action.data);
    // expect(newState.length).toBe(0)
    // expect(newState).toContainEqual({action.data})
    // expect().toEqual([]);
    expect(newState).toBeNull()
  })

})
