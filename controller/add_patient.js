// const user =  {
//     "id": "uuid",
//     "phone": "+7 913 743 24 35",
//     "name": "Иван",
//     "email": "ivan@example.com",
//     "gender": "male"
// }

const server = require("../routes/router");
const sql = require("../interactions_BD");
const format = require("../inside_methods/format");

let response = {
    msg: '',
    status: true
}

exports.add_patient = async function (req, res) {
    if(!req.body) {
        console.log('add_patient: ', err)
        res.status(500)
        res.json('Err body')
        return
    }
    let tmpObj = {}
    tmpObj.name = req.body.name;
    tmpObj.phone = format.phone(req.body.phone);
    tmpObj.email = req.body.email;
    tmpObj.gender = req.body.gender;
    // console.log('start add_patient')

    try {
        await sql.add_('patients', tmpObj)
        // console.log('Line next fn sql.add_("patients", tmpObj)')

        response.msg = "from ..controller\\add_patient.js - OK"
    } catch(ERROR) {
        console.log(ERROR)
        response.status = false
        response.msg = "from ..controller\\add_patient.js - Ne OK"
    } finally {
        res.json(response)
    }
};