import express from 'express'
const app =express()
import mongoose, { get }  from 'mongoose'
import cors from 'cors'


 const t1 = performance.now()





// middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('build'))


// db connection 
mongoose.set('strictQuery', false) 
mongoose.connect('mongodb+srv://ravimude:ajay7777@cluster0.thi8yzl.mongodb.net/1mernlogin?retryWrites=true&w=majority')
.then(()=>{console.log(' db is connected')})
.catch(()=>{ console.log('db is not connected')})

const ushema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
       
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})
const t2 = performance.now()

const Umodel = mongoose.model('user', ushema)  

app.post('/register', async(req, res)=>{ 
    
    const submiteddata = await Umodel.create(req.body)

    res.send ({ msg: 'data is submited register ' , data : submiteddata})
})

app.post('/login', async (req, res)=>{
    const name = req.body.name
    const getdata = await  Umodel.findOne({name})
    console.log(getdata)
    if(getdata){
        if(getdata.password === req.body.password){
            res.send({msg:true , data:getdata})
        }else{
            res.send({msg:false , data:'password not match'})
        }
    }else{
        res.json({msg:false})
    } 
})


app.get('/showalluser', async(req,res)=>{
    const data = await Umodel.find({})
    res.send(data)
    console.log(data)
})


const t = t2-t1
console.log(t)

// server listen 
app.listen(8000 , ()=>{ console.log(  ' server is runnig on port 8000')})