import mongoose ,{ model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://Abhyuday:u60F5ggHauhfdJM1@cluster0.s4epypq.mongodb.net/")

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});


const ContentSchema = new Schema({
    link : String,
    type: String,
    title : String,
    tags : [{type:mongoose.Types.ObjectId , ref:'Tag'}],
    userId : {type:mongoose.Types.ObjectId, ref:'Users' , required:true},
    
})


const LinkSchema = new Schema({

  hash : String,
  userId :{type:mongoose.Types.ObjectId , ref:'Users' , required:true , unique:true}

})



export const LinkModel = model("Links" , LinkSchema);

export const UserModel = model("Users", UserSchema);

export const  ContentModel = model("Content" , ContentSchema)
