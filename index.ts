import express  from 'express';
import { random } from './utils';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import bcrypt from "bcrypt"; 
import { JWT_SECRET } from './config';
import { userMiddleware } from './middleware';
import cors from "cors";

const app = express(); // ✅ this must be a real express instance

app.use(express.json());
app.use(cors());


app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.send("User Signedup");
  });



      //@ts-ignore
app.post("/api/v1/signin" , async (req , res) => {

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password are required" });
  
     try {
       const user = await UserModel.findOne({ username });
      const valid = user && await bcrypt.compare(password, user.password as string);
       if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  
       const token = jwt.sign({ id: user._id }, JWT_SECRET);
       res.json({ message: "Signin success!", token });
     } catch (err) {
       console.error(err);
       res.status(500).json({ message: "Internal Server Error" });

     }

});
    
 app.post("/api/v1/content",userMiddleware, async(req, res)=>{

    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        //@ts-ignore
        userId : req.userId,
        tags:[]
    })
    res.json({message:"Content added"})
    
 })

 app.get("/api/v1/content",userMiddleware,async(req, res)=>{
       
     //@ts-ignore
    const userId = req.userId;
    
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId" , "username")
    res.json({content})
 })


app.delete("/api/v1/content",userMiddleware, async(req, res)=>{

  const  contentId = req.body.contentId;

  await ContentModel.deleteMany({
      contentId,
      //@ts-ignore
      userId: req.userId
  }) 
  res.json({message:"Deleted!"})
})




 //@ts-ignore
 app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  //@ts-ignore
  const userId = req.userId;

  try {
    if (share) {
      let link = await LinkModel.findOne({ userId });

      if (!link) {
        
        const hash = random(10);
        link = await LinkModel.create({ userId, hash });
      }

      return res.json({ hash: link.hash });
    }

    await LinkModel.deleteOne({ userId });
    res.json({ message: "Link deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//@ts-ignore
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  try {
    const link = await LinkModel.findOne({ hash });
    if (!link) {
      return res.status(411).json({ message: "Invalid link" });
    }

    const content = await ContentModel.find({ userId: link.userId });
    const user = await ContentModel.findOne({ userId: link.userId });

    if (!user) {
      return res.status(411).json({ message: "User not found (unexpected error)" });
    }

    res.json({
      //@ts-ignore
      username: user.username,
      content: content
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong on the server" });
  }
});
 

app.listen(3000, () => {
    console.log("✅ Server is running on port 3000");
  });





