const server = require("../routes/router");
const sql = require("../database");
let response = {
    msg: 'from ..src\\check_doctors.js',
    status: true
}

exports.check_doctors_name =  async function (req, res) {
    console.log('check_doctors start...')
    if(!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }
    const doctor_id = req.body.doctor_id;

    try {
        console.log(doctor_id)
        let lst_doctors = await sql.get_collection_('doctors', [{id: doctor_id}, {}])
        console.log(lst_doctors)

        if(lst_doctors.length === 0){
            response.haveDoc = false
            console.log('no haveDoc')
        } else {
            let info_doctor = lst_doctors.filter(doctor => doctor.id = doctor_id)
            console.log('haveDoc')
            response.haveDoc = true
            response.info_doctor = info_doctor
        }
        response.msg += ' check_doctors OK!'

    } catch (ERROR) {
        response.msg += " check_doctors Ne OK"
        response.status = false
        console.log(ERROR)

    } finally {
        console.log(response.msg)
        res.json(response)
    }
}
