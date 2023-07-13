import jsonwebtoken from 'jsonwebtoken'
import moment from 'moment'

const secret = <string>process.env.SECRET_KEY
const expiresIn = moment().add(1, 'days').unix()

export const createToken = (uid: Number, name: String, email: String) => {

    try {
        const token = jsonwebtoken.sign({ uid, name, email }, secret, { expiresIn })
        return token
    } catch (error) {
        console.log(error)
        return null
    }

}