import {expect} from 'chai';
import request  from "supertest";
import server from '../src/server';
import {DB} from "../src/db"
import jwt from "jsonwebtoken"
import config from "../src/config"

const secretKey = "secretkey";
const user = {
    username: "testuser",
    password: "password123@TEST"
}
const token = jwt.sign({...user}, secretKey);


describe("API Testing Routes", () => {
    before(async ()=>{
        await DB.initDB(config.DB_URL);
        await DB.dropDB()
    })

    it(`should Register new User`, async() => {
        const res = await request(server).post("/user").send({...user});
        expect(res.statusCode).equal(201);
        expect(res.body).to.eql({username: user.username})
    });

    it(`should not allow user with same username to be registered`, async() => {
        const res = await request(server).post("/user").send({...user});
        expect(res.statusCode).equal(400);
        expect(res.body.message).to.eql("Username not Available")
    });

    it("should authentiate user and return JWT", async() => {
        const res = await request(server).post("/auth").send({...user});
        expect(res.statusCode).equal(200);
        expect(res.body).to.have.key("token")
    })

    it("should not authentiate user with incorrect password ", async() => {
        
        const newUser = {
            username: "testuser",
            password: "wrongpassword"
        }

        const res = await request(server).post("/auth").send({...newUser});
        expect(res.statusCode).equal(401);
        expect(res.body.message).to.equal("Invalid Username or Password")
    })
});

describe("Image Routes", () => {
    let image1: string;
    let image2: string;
    it(`should return empty array`, async() => {
        const res = await request(server)
            .get("/images")
            .set("Authorization",token);
        expect(res.statusCode).equal(200);
        expect(res.body).to.eql([])
    });

    it('Should upload file to server', async() => {
        const res = await request(server)
        .post("/images")
        .set("Authorization",token)
        .field("title", "atest")
        .field("desc","adesc")
        .attach("image","./test/test.png")
        expect(res.statusCode).equal(201);
        expect(res.body.title).to.equal("atest");
        expect(res.body.desc).to.equal("adesc");
        image1 = res.body.id;
    })


    it('Should upload second file to server', async() => {
        const res = await request(server)
        .post("/images")
        .set("Authorization",token)
        .field("title", "btest")
        .field("desc","bdesc")
        .attach("image","./test/test.png")
        expect(res.statusCode).equal(201);
        expect(res.body.title).to.equal("btest");
        expect(res.body.desc).to.equal("bdesc");
        image2 = res.body.id;
    })

    it('Should return error if no image sent', async() => {
        const res = await request(server)
        .post("/images")
        .set("Authorization",token)
        .field("title", "ctest")
        .field("desc","ctest")
        expect(res.statusCode).equal(404);
        expect(res.body.message).to.equal("Image Not Found");
    })

    it(`should return array with two images`, async() => {
        const res = await request(server)
            .get("/images")
            .set("Authorization",token);
        expect(res.statusCode).equal(200);
        expect(res.body.length).to.equal(2);
        expect(res.body[0]).to.have.property("title")
        expect(res.body[0]).to.have.property("desc")
        expect(res.body[1]).to.have.property("title")
        expect(res.body[1]).to.have.property("desc")
    });

    it(`should add tags to the image`, async() => {
        const res = await request(server)
        .post(`/images/${image1}/tags`)
        .set("Authorization",token)
        .send({tags: ["tag1","tag2"]})
        expect(res.statusCode).equal(200);
        expect(res.body.tags).to.eql(["tag1", "tag2"])
    });

    it(`should add tags to the image`, async() => {
        const res = await request(server)
        .post(`/images/${image2}/tags`)
        .set("Authorization",token)
        .send({tags: ["tag1","tag3"]})
        expect(res.statusCode).equal(200);
        expect(res.body.tags).to.eql(["tag1", "tag3"])
    });

    it(`should return images with tag2`, async() => {
        const res = await request(server)
        .get(`/tags/tag2/images`)
        .set("Authorization",token)
        expect(res.body.length).to.equal(1);
        expect(res.body[0].title).to.equal("atest");
        expect(res.body[0].desc).to.equal("adesc");
    });

    it(`should return all tags`, async() => {
        const res = await request(server)
            .get("/tags")
            .set("Authorization",token);
        expect(res.statusCode).equal(200);
        expect(res.body.tags).to.eql(["tag1", "tag2", "tag3"])
    });

    it(`should remove the tags from the image`, async() => {
        const res = await request(server)
        .post(`/images/${image1}/tags`)
        .set("Authorization",token)
        .send({tags: []})
        expect(res.statusCode).equal(200);
        expect(res.body.title).to.equal("atest");
        expect(res.body.desc).to.equal("adesc");
        expect(res.body.tags).to.eql([])
    });

    it(`should delete the image`, async() => {
        const res = await request(server)
            .delete(`/images/${image1}`)
            .set("Authorization",token);
        expect(res.statusCode).equal(204);
    });
});