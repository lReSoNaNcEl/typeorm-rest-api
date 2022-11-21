import {Router} from 'express'
import MusicController from "../controllers/MusicController"
import {validate} from "class-validator"

// import {MusicCreateDto} from "./dto/music/music-create.dto"

// const DtoValidate = (dto) => {
//     const entity = new dto()
//     const keys = Object.keys(entity)
//     return async (req, res, next) => {
//         keys.map(key => entity[key] = req.body[key])
//         console.log(entity)
//         console.log(req.body)
//         const errors = await validate(entity)
//         errors.length ? res.status(400).json(errors) : next()
//     }
// }

// const musicCreateValidate = async (req, res, next) => {
//     const music = new MusicCreateDto()
//     music.name = req.body.name
//     music.author = req.body.author
//
//     const errors = await validate(music)
//
//     errors.length ? res.status(400).json(errors) : next()
// }



const {getAll, create} = MusicController
const Route = Router()

Route.get('/music', getAll)

Route.post('/music', create)

export default Route
