import { Prisma } from "@prisma/client"
import config from "config";
import { omit } from "lodash";
import { signJwt } from "../utils/jwt";
import redisClient from "../utils/redis";

export const excludedFields = [
    "clientSecret",
    "updatedAt",
    "deleted",
]

const authClient = async(data: Prisma.sectionClientCreateInput, ttl:number) => {
    try{
        console.log(config.get<number>("redisCacheExpiresIn"));
        console.log(config.get<number>("accessTokenExpiresIn"));
        console.log(config.get<number>("refreshTokenExpiresIn"));
    
        redisClient.set(`${data.clientID}`, JSON.stringify(omit(data, excludedFields)), {
            EX: config.get<number>("redisCacheExpiresIn") * 60,
        });
        

        const accessToken = signJwt({ sub: data.clientID }, "accessTokenPrivateKey", {
        expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
        });
    
        const refreshToken = signJwt({ sub: data.clientID }, "refreshTokenPrivateKey", {
        expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
        });
        return {accessToken, refreshToken}
    }catch(e:any){
        console.log("***************");
        console.log(e);
        const accessToken = 0
        const refreshToken = 0
        return {accessToken, refreshToken}
    }
}


export default {
    authClient,
}