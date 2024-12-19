const server = require("../routes/router");
// const sql = require("../interactions_BD");
const dataset = require("../database");
let response = {
    msg: 'from ..controller/send_robocall.js',
    status: true
}

exports.send =  async function (req, res) {
    if (!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }

    try{
        response.msg += ' send() OK!'

    }
    catch (ERROR) {
        response.msg += " send() Ne OK"
        response.status = false
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}