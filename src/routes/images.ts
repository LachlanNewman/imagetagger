import { Router , Request, Response, NextFunction } from "express";
import { descRequiredError, imageNotFoundError, titleRequiredError } from "../error";
import Image from "../models/image";
import multer from "multer";
import fs from "fs";
import config from "../config";

const storage = multer.diskStorage({
    destination: (req:Request, file, cb) => {
        cb(null, 'images')
    },
    filename: async (req: Request, file, cb) => {
        const image = new Image({
            title: req.body.title,
            desc: req.body.desc,
        });
        await image.save();
        cb(null, image._id.toString())
    }
});

const upload = multer({ storage: storage });

const router = Router()

router.get("/", async (req:Request,res: Response,next:NextFunction) => {
    const images = await Image.find()
    res.send(images)
})

router.post("/",upload.single('image'), async(req:Request,res: Response, next: NextFunction) => {
    if(!req.file){
        next(imageNotFoundError)
        return
    }

    const id = req.file.filename;
    const title = req.body.title;
    const desc = req.body.desc;

    if(!title)  { next(titleRequiredError)}
    if(!desc)   { next(descRequiredError)}

    res.statusCode = 201;
    res.send({
        id,
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
    const title =  req.body.title
    const desc = req.body.desc;

    if(!title)  { next(titleRequiredError)}
    if(!desc)   { next(descRequiredError)}

    await Image.findByIdAndUpdate(id,{title,desc})
    const image = await Image.findById(id);
    res.send(image)
})

router.delete("/:id",async (req:Request,res: Response, next: NextFunction) => {
    const id = req.params.id;
    await Image.findByIdAndDelete(id)
    fs.unlinkSync(`${config.IMG_DIR}/${id}`)
    res.statusCode = 204
    res.send({});
})

router.post("/:id/tags",async (req:Request,res: Response,next:NextFunction) => {
    const id = req.params.id;
    const tags = req.body.tags as string[]
    await Image.findByIdAndUpdate(id,{tags})
    const image = await Image.findById(id);
    res.send(image)
})



export default router;