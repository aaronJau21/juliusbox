import mongoose from "mongoose"

const db = async () => {
    const uri = <string>process.env.DB_URI

    try {
        await mongoose.connect(uri)
    } catch (error) {
        console.log(error)
    }
}

export default db