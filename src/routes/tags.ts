import { Router , Request, Response } from "express";
import { images } from "./images";
const router = Router()

router.get("/", async (req:Request,res: Response) => {
    const tags = Array.from(new Set(images.map(image => image.tags).flat()).values())
    res.send({tags})
})

router.delete("/:tag", async (req:Request,res: Response) => {
    const tag = req.params.tag;
    for(const image of images){
        const tagIndex = image.tags.indexOf(tag);
        image.tags.splice(tagIndex,1)
    }
    res.statusCode = 204
    res.send({})
})

router.get("/:tag/images",async (req:Request,res: Response) => {
    const tag = req.params.tag;
    const imagesWithTag = images.filter(image => image.tags.includes(tag))
    res.send(imagesWithTag)
})

router.delete("/:tag/images",async (req:Request,res: Response) => {
    const tag = req.params.tag;
    for(let i = 0; i < images.length; i++){
        const image = images[i]
        if(image.tags.includes(tag)){
            images.splice(i,1)
        }
    }
    res.statusCode = 204
    res.send({})
})



export default router;