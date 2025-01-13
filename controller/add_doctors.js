const server = require("../routes/router");
const sql = require("../interactions_BD");
const format = require("../inside_methods/format");

let response = {
    msg: '',
    status: true
}

exports.add_doctors = async function (req, res){
    if(!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }
    const name = format.fullName(req.body.name);
    const spec = req.body.spec;
    const price = req.body.price;

    let tmp = ''
    try {
        await sql.add_('doctors', req.body)

        response.msg = "from ..controller\\add_doctors.js - OK"
    } catch(ERROR) {
        response.status = false
        response.msg = "from ..controller\\add_doctor.js - Ne OK"
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}

