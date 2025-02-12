const server = require("../routes/router");
const sql = require("../interactions_BD");
const moment = require('moment');
let response = {
    msg: '',
    status: true
}

exports.get_appointment =  async function (req, res) {
    if (!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }

    const doctor_id = req.body.doctor_id;
    const is_free = req.body.is_free;
    const data = req.body.data;

    try{
        let full_data = moment(data).toISOString()
        let day = moment(full_data).format('YYYY-MM-DD')
        console.log('full_data: ', full_data)
        console.log('format: ', day)

        response.answer = await sql.get_schedule_doctors(day, doctor_id, is_free)
        response.msg = "from ..controller\\get_appointment.js - OK"
    }
    catch (ERROR) {
        response.status = false
        response.msg = "from ..controller\\get_appointment.js - Ne OK"
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}
