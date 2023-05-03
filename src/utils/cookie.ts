import { Response } from 'express'

export const clearCookie = (res: Response): void => { 
    res.cookie('accessToken', '', { maxAge: 1 })
    res.cookie('refreshToken', '', { maxAge: 1 })
    res.cookie('loggedIn', '', { maxAge: 1 })
}

