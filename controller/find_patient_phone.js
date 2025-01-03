const server = require("../routes/router");
const sql = require("../interactions_BD");
const format = require("../inside_methods/format");

let response = {
    msg: '',
    status: true
}

exports.get_find_patient_phone = async function (req, res) {
    if (!req.body) {
        console.log('find_patient: ')
        res.status(500)
        res.json('Err body')
        return
    }

    const phone = req.body.phone;

    try{
        const FPN = format.phone(phone);
        console.log('find_patient', FPN)

        response.answer = await sql.get_patient(FPN)
        response.msg = "from ..controller/find_patient_phone.js - OK!"
    }
    catch(ERROR) {
        response.msg = "from ..controller/find_patient_phone.js - Ne OK!"
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}