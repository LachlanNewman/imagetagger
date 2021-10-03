import { Router , Request, Response, NextFunction } from "express";

const router = Router()
const images = [{
    title: "testtitle",
    desc: "testDesc",
    tags: ["tag1", "tag2"]
}]

router.get("/", (req:Request,res: Response,next:NextFunction) => {

    res.send(images)
})

router.post("/",(req:Request,res: Response, next: NextFunction) => {
    const title = req.body.title;
    const desc = req.body.desc;
    images.push({
        title,
        desc,
        tags: []
    })
    res.statusCode = 201;
    res.send({
        title,
        desc,
    })
})

export default router;