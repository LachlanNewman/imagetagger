import { Router , Request, Response, NextFunction } from "express";

const router = Router()

router.get("/", async (req:Request,res: Response,next:NextFunction) => {
    const images = [{
        title: "testtitle",
        desc: "testDesc",
        tags: ["tag1", "tag2"]
    }]
    res.send(images)
})

export default router;