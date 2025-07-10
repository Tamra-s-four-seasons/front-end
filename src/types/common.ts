export interface ApiResponse<T> extends Response {
  json(): Promise<T>;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export class ApiResponseError extends Error {
  /** @TODO 백엔드 에러 코드들을 constants 안에 저장하고 변수로 사용 */
  readonly code: string;
  readonly fieldErrors: ApiFieldError[] | null;

  constructor(
    message: string,
    code: string,
    fieldErrors: ApiFieldError[] | null
  ) {
    super(message);
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}
