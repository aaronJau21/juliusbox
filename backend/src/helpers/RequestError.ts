import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

const RequestError = (req: Request, res: Response, next: NextFunction) => {


    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).send({ errors: error.array() })
    }

    next()

}

export default RequestError