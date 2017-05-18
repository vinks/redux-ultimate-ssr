export default class AxiosError extends Error {
  constructor(axiosError) {
    super(axiosError)

    this.message = axiosError.message

    this.request = {
      method: axiosError.config.method,
      url: axiosError.config.url,
      headers: axiosError.config.headers
    }

    this.response = {
      status: axiosError.response.status,
      statusText: axiosError.response.statusText,
      headers: axiosError.response.headers,
      contentType: axiosError.response.headers['content-type'],
      contentLength: axiosError.response.headers['content-length'],
      data: axiosError.response.data
    }
  }
}
