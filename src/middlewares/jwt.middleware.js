import jwt from "jsonwebtoken";

export default function jwtAuth(req,res,next) {

    const token = req.headers["authorization"];
    if(!token) {
        return res.status(401).send("headers is empty");
    }

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.userID = payload.userID;
        // res.status(200).send(payload);
    }
    catch(err) {
        return res.status(401).send("Unauthorized");
    }  
    next();
}