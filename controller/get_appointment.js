const server = require("../routes/router");
const sql = require("../interactions_BD");
const moment = require('moment');

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
    let response = ''

    try{
        let full_data = moment(data).toISOString()
        let day = moment(full_data).format('YYYY-MM-DD')

        const answer = await sql.get_schedule_doctors(day, doctor_id, is_free)

        response = answer

    }
    catch (ERROR) {
        response = "Ne OK: from get_appointment.js"
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}
