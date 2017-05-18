import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { store } from '../misc'
import AxiosError from './AxiosError'

export default class ApiCore {
  constructor() {
    this._AXIOS = generateAxiosInstance()
  }

  setAdapter(adapter) {
    this._AXIOS.defaults.adapter = adapter
  }

  delete(urlPath) {
    return this._AXIOS.delete(urlPath)
      .then(res => makeResponse(res.data))
      .catch(cleanErrors)
  }

  get(urlPath, params) {
    return this._AXIOS.get(urlPath, { params })
      .then(res => makeResponse(res.data))
      .catch(cleanErrors)
  }

  post(urlPath, data) {
    return this._AXIOS.post(urlPath, data)
      .then(res => makeResponse(res.data))
      .catch(cleanErrors)
  }

  put(urlPath, data) {
    return this._AXIOS.put(urlPath, data)
      .then(res => makeResponse(res.data))
      .catch(cleanErrors)
  }
}

function generateAxiosInstance() {
  const axiosConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 15000
  }

  const axiosInstance = axios.create(axiosConfig)

  let ignoreLoader = false

  axiosInstance.interceptors.request.use(config => {
    if (config.params && config.params.ignoreLoader) {
      ignoreLoader = true
    }

    // Before request is sent
    if (!ignoreLoader && __CLIENT__) {
      store.dispatch(showLoading())
    }

    return config
  })

  axiosInstance.interceptors.response.use(response => {
    // After response data
    if (!ignoreLoader && __CLIENT__) {
      store.dispatch(hideLoading())
    }

    return response
  })

  return axiosInstance
}

function makeResponse(resData) {
  if (resData.status === 'success') {
    return resData.data
  }

  cleanErrors(new Error(resData.message))
}

function cleanErrors(error) {
  if (error.config) {
    throw new AxiosError(error)
  }

  throw error
}
