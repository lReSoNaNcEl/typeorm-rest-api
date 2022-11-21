import {Router} from "express"
import RouteAuth from './auth'
import RouteMusic from './music'

export const routes: Router[] = [
    RouteMusic,
    RouteAuth
]
