import { Router , Request, Response } from "express";
import Image from "../models/image";

const router = Router()

router.get("/", async (req:Request,res: Response) => {
    const images = await Image.find();
    const tags = Array.from(new Set(images.map(image => image.tags).flat()).values())
    res.send({tags})
})

router.delete("/:tag", async (req:Request,res: Response) => {
    const tag = req.params.tag;
    const images = await Image.find({tags: tag});
    for(const image of images){
        const tagIndex = image.tags.indexOf(tag);
        if(tagIndex > -1){
            image.tags.splice(tagIndex,1)
            await image.save()
        }
    }
    res.statusCode = 204
    res.send({})
})

router.get("/:tag/images",async (req:Request,res: Response) => {
    const tag = req.params.tag;
    const images = await Image.find({tags: tag});
    res.send(images)
})

router.delete("/:tag/images",async (req:Request,res: Response) => {
    const tag = req.params.tag;
    await Image.deleteMany({tags: tag})
    res.statusCode = 204
    res.send({})
})



export default router;