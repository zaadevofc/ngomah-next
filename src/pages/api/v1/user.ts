import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { auth } from "../auth/[...nextauth]";
// import prisma from "../../../../modules/db";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const session: any = await getServerSession(req, res, auth)
    if (!session) return res.status(400).send({ msg: 'unauthorized' })

    // let find = await prisma.user;
    
    return res.status(200).send({ session })
}