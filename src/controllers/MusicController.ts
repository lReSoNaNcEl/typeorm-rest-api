import {getRepository, Repository} from "typeorm"
import {User} from "../models/User"
import {Music} from "../models/Music"
import {validate} from "class-validator"
import fs from 'fs'
import path from 'path'

const maxAudioSize = 40 * 1024 * 1024 //40mb

enum Validator {
    MUSIC_MESSAGE_CREATE_415 = 'Incorrect mimetype file. Expected audio/mpeg',
    MUSIC_MESSAGE_CREATE_413 = 'Maximum file size exceeded (40mb)',
    MUSIC_MESSAGE_CREATE_400 = 'Error, expected fields - [track: FormData, name: string, author: string]',
}

const fsAsync = fs.promises

const getAll = async (req, res) => {

}

const create = async (req, res) => {
    const {files} = req
    const {name, author} = req.body

    if (files && files.track) {

        const {track} = files
        const musicRepository = await getRepository(Music)

        const music = await musicRepository.create({name, author})

        if (track.mimetype === 'audio/mpeg' && track.size < maxAudioSize) {
            await fsAsync.writeFile(path.join(__dirname, `../public/${track.name}`), track.data)

            return res.status(201).json({name: track.name})
        }
        else if (track.mimetype !== 'audio/mpeg')
            return res.status(415).json({error: Validator.MUSIC_MESSAGE_CREATE_415})
        else if (track.size > maxAudioSize)
            return res.status(413).json({error: Validator.MUSIC_MESSAGE_CREATE_413})
    }
    else return res.status(400).json({error: Validator.MUSIC_MESSAGE_CREATE_400})
}

export default {getAll, create}
