import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const authMiddleware = async(request,response,next)=>{
    try {
        const token = request.cookies.token || request?.headers?.authorization?.split(" ")[1]
       
        if(!token){
            return response.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }
        const user = await User.findById(decode.id)
        request.user = user
        next();

    } catch (error) {
        return response.status(500).json({
            message : "You need to login first",///error.message || error,
            error : true,
            success : false
        })
    }
}

export default authMiddleware