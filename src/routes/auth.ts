import {Router} from "express"
import AuthController from "../controllers/AuthController"

const {signup, login} = AuthController
const Route = Router()

Route.post('/signup', signup)

Route.post('/login', login)

export default Route


