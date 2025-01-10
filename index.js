const cron = require('node-cron');
const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json())

const server = require("./routes/router.js");
app.use("/server", server);

app.use((err, req, res, next) => {
    console.error('Ошибка:', err);
    res.status(500).send('Что-то сломалось!');
});

app.listen(PORT, function (err) {
    if (err) throw err;
    console.log("Server listening on PORT", PORT);
    console.log(`http://localhost:${PORT}/server/`)
})

const collect = require('./src/collect');
const caller = require('./src/caller');
const watchDog = require('./src/watchDog')

// console.log("Start cron...")
// cron.schedule('* * * * *', function() {
//     collect.protocol()
// });
// cron.schedule('20 0-59 * * * *', function() {
//     caller.protocol()
// });

// cron.schedule('40 0-59 * * * *', function() {
//     watchDog.protocol()
// });

// Middleware для обработки ошибок



