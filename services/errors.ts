// utils/errors.ts
export class ApiError extends Error {
  statusCode: number
  data: any
  errorCode: string

  constructor(errorCode: string, message: string, statusCode: number, data: any) {
    super(message)
    this.name = "ApiError"
    this.errorCode= errorCode
    this.statusCode = statusCode
    this.data = data
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NetworkError"
  }
}
