export const customStatus = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

export const wordReturn = {
    AUTH_WRONG: "client id or client secret is wrong",
    AUTH_CLIENT_NOT_FOUND: "client not found",
    AUTH_SESSION_EXPIRED: "session expired",
    AUTH_TOKEN_EXPIRED: "token expired",
    AUTH_UNAUTHORIZED: "client unauthorized",

    SUCCESS: "success"
}

export interface customResponse {
    statusCode: any
    total?: number
    data?: any
}
