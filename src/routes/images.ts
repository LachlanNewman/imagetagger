import { Router , Request, Response, NextFunction } from "express";

const router = Router()
const images = [{
    id: "0",
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
    const id = images.length.toString();
    images.push({
        id,
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

router.get("/:id",async (req:Request,res: Response,next:NextFunction) => {
    const id = parseInt(req.params.id);
    const image = images[id]
    res.send(image)
})

export default router;