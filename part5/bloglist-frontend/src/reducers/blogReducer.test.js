import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'Testing title',
        author: 'Author testing',
        url: 'www.test.com',
        likes: 3,
        user: {username:'loco', id:3},
        id: 2

      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)
    console.log("newState **:",typeof newState);
    console.log("state orig:", state);
    console.log("state:", newState);


    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

test('delete works REMOVE_BLOG', () => {
    const state = [{        title: 'Testing title',
      author: 'Author testing',
      url: 'www.test.com',
      likes: 3,
      user: {username:'loco', id:3},
      id: 2
    }]
    const action = {
      type: 'REMOVE_BLOG',
      data: {id: 2}
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)
    // console.log("newState **:",typeof newState.length);
    console.log("state::", state);
    console.log("newState::", newState);
    expect(newState.length).toBe(0)
    // expect(newState).toContainEqual({action.data})
    // expect().toEqual([]);
    expect(newState).toMatchObject({})
  })

  // test('returns new state with action TOGGLE_IMPORTANCE', () => {
  //   const state = [
  //     {
  //       content: 'the app state is in redux store',
  //       important: true,
  //       id: 1
  //     },
  //     {
  //       content: 'state changes are made with actions',
  //       important: false,
  //       id: 2
  //     }]
  //
  //   const action = {
  //     type: 'TOGGLE_IMPORTANCE',
  //     data: {
  //       id: 2
  //     }
  //   }
  //
  //   deepFreeze(state)
  //   const newState = noteReducer(state, action)
  //
  //   // expect(newState).toHaveLength(2)
  //   expect(newState.length).toBe(2)
  //
  //   expect(newState).toContainEqual(state[0])
  //
  //   expect(newState).toContainEqual({
  //     content: 'state changes are made with actions',
  //     important: true,
  //     id: 2
  //   })
  // })

})
