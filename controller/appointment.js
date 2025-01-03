const server = require("../routes/router");
const sql = require("../interactions_BD");
const checker = require("../inside_methods/checker");
let response = {
    msg: '',
    status: true
}

// method record slot on table schedule
exports.appointment =  async function (req, res) {
    if (!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }

    const patient_id = req.body.patient_id;
    const doctor_id = req.body.doctor_id;
    const schedule_id = req.body.schedule_id;

    try {
        let data =  await sql.get_data_schedule(schedule_id)
        // console.log('Получаемая инфы о слоте по id', data)
        const obj = checker.slotSchedule(data)
        // console.log('obj - это объект данных после проверки на возможности записи в таблице schedule')
        // console.log(obj)

        let count = await sql.get_count_visit(doctor_id, patient_id)
        let changes = {
            "id" : "id",
            "option_id": schedule_id ,
            "name_patient_id" : "patient_id",
            "on_ny_patient": patient_id,
            "name_is_free" : "is_free",
            "on_ny_is_free": 0,
            "name_type": 'type',
            "on_ny_type": count,
        }

        if(obj['status']){
            response.status = obj['status']
            response.resultRecord = obj['msg']
            sql.update_('schedule', changes)
        } else {
            response.reasonForRefusalRecord = obj['msg']
            response.status = obj['status']
        }
        response.msg = "from ..controller\\appointment.js - OK"

    } catch (ERROR) {
        response.msg = "from ..controller\\appointment.js - Ne OK"
        response.status = false
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}