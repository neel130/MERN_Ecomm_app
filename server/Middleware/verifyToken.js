const jwt = require("jsonwebtoken")

exports.verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    try {
        if(!authHeader){
            return res.status(403).json({error:"you are not authorized to do this action authheader not available"})
        }
        const token = authHeader.split(" ")[1]
        if(!token){
            return res.status(403).json({error:"you are not authorized to do this action token not available"})
        }
        jwt.verify(token,process.env.SEC_KEY,(err,user)=>{
            if(err){
             return res.status(404).json({error:"invalid token"})
            }
            req.user = user;
            next();
        })
        
    } catch (error) {
        console.log("error"+ error)
    }
}


exports.verifyTokenandAuthorization = (req,res,next)=>{
          this.verifyToken(req,res,()=>{
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }else{
                return res.status(403).json({error:"you are not authorized to do this action 2"})
            }
          })
}


exports.verifyTokenandAdmin = (req,res,next)=>{
    this.verifyToken(req,res,()=>{
      if( req.user.isAdmin){
          next();
      }else{
          return res.status(403).json({error:"your are not admin"})
      }
    })
}