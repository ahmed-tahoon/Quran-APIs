const express = require("express")
const bodyParser = require('body-parser');
const ejs = require("ejs")
const https = require("https");
const { all } = require("express/lib/application");


const app = express();


app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true}))


app.get("/",(req,res)=>{

    res.render("home",{
        identifier : "",
        d:"select One",
        su:"select One",
        surah:""
    })

    })

app.post("/",(req,res)=>{
        const user = req.body.user;
        const s = req.body.surah;
        console.log(req.body)
        const url = "https://api.alquran.cloud/v1/edition/format/audio"
       const url2 = "http://api.alquran.cloud/v1/surah"
        https.get(url,(response)=>{
            
            response.on("data",(data)=>{
                const allData = JSON.parse(data);
                allData.data.forEach(element => {
                    if(element.englishName==user)
                    {
                     d=element.englishName;
                       res.render("home",{
                           identifier : element.identifier,
                           surah:s,
                           d:d,
                           su:s
                           
                       })
                    }
                });
          
                
            })
            
        })



})    

app.listen(5000,()=>{
    console.log("Hello to Our server 3000")
})