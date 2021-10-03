export class HttpError extends Error{
    public statusCode: number
    constructor(statusCode: number,msg: string){
        super(msg)
        this.statusCode = statusCode;
    }
}

export const invalidUserNameError   = new HttpError(401, "Invalid Username or Password" )
export const invalidJWTError        = new HttpError(401, "JWT Token is invalid"         )
export const userNameExistsError    = new HttpError(400, "Username not Available"       )
export const userNameRequiredError  = new HttpError(400, "Username Required"            )
export const titleRequiredError     = new HttpError(400, "Image Title Required"         )
export const descRequiredError      = new HttpError(400, "Image Description Required"   )
export const invalidPasswordError   = new HttpError(401, "Password must be minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")
export const imageNotFoundError     = new HttpError(404, "Image Not Found"              )
