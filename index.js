import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
import axios from "axios";

const HomeStarting = "Home is where the heart is, but in this case its where my ideas live. Feel free to browse my posts!";
const forAbout = "Hello World! I'm Jordan. I am a 22 year old self taught developer!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let authen = false;

app.get("/", (req, res) =>{
    res.render("home", {
        HomeStarting: HomeStarting,
        myContent: holder
    });
    
});


function authentic(req, res, next){
    const password = req.body["password"];

    if(password === "Candy4473"){
        authen = true;
    }
    next();
}

app.use(authentic);

app.get("/password", (req, res) =>{
    res.render("password");
});




app.post("/password", (req, res) =>{
  if(authen === true){
    res.redirect("create");
  }else{
    res.render("password");
  }
});

app.get("/about", (req, res) =>{
    res.render("about", {
        contents: forAbout
    });
});

app.get("/contact", (req, res) =>{
    res.render("contact", {
        contactPage: forContacts
    });
});

app.get("/create", (req, res) =>{
    res.render("create");
});

var holder =[];

app.post("/create", (req, res) =>{
    const info = req.body["text"];
    const info2 = req.body["text2"];
    const post = {
        title: req.body["postTitle"],
        body: req.body["postBody"]
    }

    holder.push(post);
    res.redirect("/");
});

app.get("/post/:postName", (req, res)=>{
   const TitleRequest = _.lowerCase(req.params.postName);
    holder.forEach((post) =>{
        const storedTitle = _.lowerCase(post.title);

        if(storedTitle === TitleRequest){
        res.render("post", {
            title: post.title,
            content: post.body
        });
        }
    });
});

app.listen(3000, ()=>{
    console.log("server started on port 3000");
});