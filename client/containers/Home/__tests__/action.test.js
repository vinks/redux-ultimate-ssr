import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from '../../../api'
import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock'

import {
  fetchUsers,
  USERS_REQUESTING,
  USERS_FAILURE,
  USERS_SUCCESS
} from '../action'

const host = 'http://localhost'

axios.exampleApi.setPath(`${host}/test`)
axios.apiCore.setAdapter(httpAdapter)

const mockStore = configureMockStore([thunk])

describe('fetch users data', () => {
  const response = {
    status: 'success',
    data: [{ id: '1', name: 'Welly' }]
  }
  const errorMessage = 'Request failed with status code 500'

  afterEach(() => {
    nock.disableNetConnect()
  })

  test('creates USERS_SUCCESS when fetching users has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response)

    const expectedActions = [
      { type: USERS_REQUESTING },
      { type: USERS_SUCCESS, data: response.data }
    ]
    const store = mockStore({ list: null })

    store.dispatch(fetchUsers(axios))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  test('creates USERS_FAILURE when fail to fetch users', () => {
    nock(host)
      .get('/test')
      .reply(500, errorMessage)

    const expectedActions = [
      { type: USERS_REQUESTING },
      { type: USERS_FAILURE, err: new Error([errorMessage]) }
    ]
    const store = mockStore({ err: null })

    store.dispatch(fetchUsers(axios))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
