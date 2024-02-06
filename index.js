const express = require("express");
const bodyparser = require("body-parser");


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))


const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Hello There");
})


const authRouter = require("./routes/auth");
const postsRouter = require("./routes/post");

app.use("/auth", authRouter);
app.use("/post", postsRouter);

app.listen(PORT, () => {
    console.log(`Now running on PORT: ${PORT}`);
})
