console.log("Starting server")

const express = require('express')
const app = express();

//app.use(require("cors"))


require("./database")
require("./passport.js").init(app)
require("./users_api").init(app)
require("./posts_api").init(app)

app.use('/', express.static("public/"))
app.use('*', express.static("public/"))



app.listen(3000, () => {console.log("Server running")})
