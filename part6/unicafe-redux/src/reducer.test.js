import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset button resets', () => {
    const action = {
      type: 'ZERO'
    }
    const actionPrep1 = {
      type: 'GOOD'
    }
    const actionPrep2 = {
      type: 'OK'
    }
    const actionPrep3 = {
      type: 'BAD'
    }

    const state = initialState

    deepFreeze(state)
    const newStatePrep1 = counterReducer(state, actionPrep1)
    const newStatePrep2 = counterReducer(newStatePrep1, actionPrep2)
    const newStatePrep3 = counterReducer(newStatePrep2, actionPrep3)
    expect(newStatePrep3).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
