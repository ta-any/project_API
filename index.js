const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const server = require("./routes/router.js");
app.use("/server", server);

app.listen(PORT, function (err) {
    if (err) throw err;
    console.log("Server listening on PORT", PORT);
    console.log(`http://localhost:${PORT}/server/appointment`)
})



// async function getUserById(id) {
//     try {
//         const id_d = await prisma.schedule.findUnique({
//             where: {
//                 id
//             }
//         })
//         console.log(id_d)
//         return id_d
//     } catch(e) {
//         onError(e)
//     }
// }
// getUserById()



