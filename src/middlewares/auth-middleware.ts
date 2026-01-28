import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import {prisma} from "../database"
import { HttpError } from "../error/HttpError";


interface JwtUserPayload extends JwtPayload {
  id: number; 
}


export const ensureAuth = async(req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization 

    if(!authHeader) throw new HttpError(401, "Acesso Negado!")

    const token = authHeader.split(' ')[1]


    try {

        const decoded = jwt.verify(token, process.env.JWT_KEY!) as JwtUserPayload;

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if(!user) throw new HttpError(401, "Usuario não encontrado!");
       

        (req as any).user = user
        next()

    } catch (error) {
        next(error)
    }

}
