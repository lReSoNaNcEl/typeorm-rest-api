import {getRepository} from "typeorm"
import {User} from "../models/User"

const signup = async (req, res) => {
    const userRepository = await getRepository(User)

    const {email, password} = req.body

    try {
        let user = await userRepository.findOne({email})

        if (!user) {
            const payload = await userRepository.create({email, password})
            user = await userRepository.save(payload)
            user = await userRepository.findOne({
                where: {email},
                select: ['id', 'email', 'created'],
            })
            res.status(201).json(user)
        }
        else {res.status(400).end()}
    }
    catch (e) {console.log(e)}
}

const login = async (req, res) => {
    res.status(200).json({success: true})
}

export default {signup, login}
