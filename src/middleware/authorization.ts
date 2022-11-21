import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

const secret = 'Resonance'

type TAuthServiceOptions = {
    identityHeaderKey: string
    headers: object,
    pathname: string
}

type TVerifyUser = {
    id: number,
    email: string,
    iat: number,
    exp: number
}

class VerifyUser {
    constructor(private user: TVerifyUser) {}

    checkLifetimeJwt(): boolean {
        if (Date.now() > this.user.exp * 1000)
            return false
        else return true
    }
}

class AuthService {

    protected headers
    protected identityKey: string
    protected publicPaths: string[]
    protected pathname: string

    constructor(private options: TAuthServiceOptions) {
        this.headers = options.headers
        this.identityKey = options.identityHeaderKey
        this.pathname = options.pathname
    }

    public setPublicRoutes(routes: string[]): void {
        this.publicPaths = routes
    }

    private isAuthorizationHeader(): boolean {
        if (!this.headers['authorization'])
            return false
        else return true
    }

    private validateJwtTokenFromHeader(): boolean {
        const regExp = new RegExp(this.identityKey)
        const val = this.headers['authorization']
        if (val.match(regExp) && val.match(regExp).index === 0)
            return true
        else false
    }

    public getJwtTokenFromHeaders(): string {
        if (this.validateJwtTokenFromHeader())
            return this.headers['authorization'].substr(this.identityKey.length + 1)
        else return null
    }

    public authenticate(req): boolean {
        if (this.publicPaths.includes(req._parsedUrl.pathname)) {
            return true
        }
        else {
            console.log(req)
            if (this.isAuthorizationHeader()) {
                const token = this.getJwtTokenFromHeaders()

                if (token) {
                    try {
                        const encodedJwt = jwt.verify(token, secret)
                        const candidate: any = typeof encodedJwt === 'object' ? encodedJwt : null
                        const {id, email} = candidate.data
                        const {iat, exp} = candidate
                        const verifyUser = new VerifyUser({id, email, iat, exp})

                        if (verifyUser.checkLifetimeJwt())
                            return true
                        else return false
                    }
                    catch (e) {return false}
                }
            }
            else {return false}
        }
    }
}


export default function (req, res, next) {
    const {headers, _parsedUrl} = req

    const authService = new AuthService({
        headers: headers,
        pathname: _parsedUrl.pathname,
        identityHeaderKey: 'Bearer',
    })
    authService.setPublicRoutes([
        '/api/signup',
        '/api/login',
    ])

    if (authService.authenticate(req)) {
        next()
    }
    else res.status(403).end('Forbidden')

    // const token = jwt.sign({
    //     data: {
    //         id: 1,
    //         email: 'iresonancei@mail.ru',
    //     }
    // }, secret, {expiresIn: '7d'})

    // fs.writeFileSync(path.join(__dirname, 'token.txt'), token)

    // console.log(jwt.verify(token, secret))

}
