import express, {Application, Router} from 'express'
import {createConnection} from "typeorm"
import bootstrap from "./bootstrap"
import {routes} from './routes'

export const App: Application = express()

bootstrap(App)
routes.map((route: Router) => App.use('/api', <Router>route))

App.listen(8000, async () => await createConnection())
