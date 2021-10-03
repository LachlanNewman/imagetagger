import { Router , Request, Response, NextFunction } from "express";
import Image from "../models/image";

const router = Router()

router.get("/", async (req:Request,res: Response,next:NextFunction) => {
    const images = await Image.find()
    res.send(images)
})

router.post("/", async(req:Request,res: Response, next: NextFunction) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const tags:string[] = [];
    const image = new Image({title,desc,tags})
    await image.save();
    res.statusCode = 201;
    res.send({
        title,
        desc,
    })
})

router.get("/:id",async (req:Request,res: Response,next:NextFunction) => {
    const image = await Image.findById(req.params.id);
    res.send(image)
})

router.put("/:id", async (req:Request,res: Response, next: NextFunction) => {
    const id = req.params.id;
    const title =  req.body.titlel
    const desc = req.body.desc;
    await Image.findByIdAndUpdate(id,{title,desc})
    const image = await Image.findById(id);
    res.send(image)
})

router.delete("/:id",async (req:Request,res: Response, next: NextFunction) => {
    const id = req.params.id;
    await Image.findByIdAndDelete(id)
    res.statusCode = 204
    res.send({});
})

router.post("/:id/tags",async (req:Request,res: Response,next:NextFunction) => {
    const id = req.params.id;
    const tags = req.body.tags as string[]
    console.log(tags)
    await Image.findByIdAndUpdate(id,{tags})
    const image = await Image.findById(id);
    res.send(image)
})



export default router;