import express from "express";
import color from 'colors';
import dotenv from 'dotenv';
import cors from 'cors'
import con from "./config/Db.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

// send notes
app.post('/create-note',(req,res)=>{
    const data = req.body;
con.query('Insert INTO notes SET ?', data, (error,result,fields)=>{
    if(error){
        res.status(400).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }else{
        res.status(201).send({
            success:true,
            message:"Create note successfully",
            result
        })
    }

})
})

// get notes
app.get('/get-notes',(req,res)=>{
    con.query('select * from notes',(err, result)=>{
        if(err){
            res.status(400).send({success:false, message:"Something went wrong", err})
        }else{
            res.status(200).send({
                success:true,
                message:"Get All notes Successfully",
                result
            })
        }
    })
})

// Delete Note

app.delete('/delete-note/:id',(req,res)=>{

    con.query('DELETE FROM notes WHERE id ='+ req.params.id,(err,result)=>{
        if(err){
            res.status(400).send({
                success:false,
                message:"Something went wrong",
                err
            })
        }else{
            res.status(200).send({
                success:true,
                message:"Delete note successfully",
                result
            })
        }
    })
})


const PORT  = process.env.PORT
app.listen(PORT,()=>{
    console.log(` Server running on port ${PORT}`.bgWhite)
})



