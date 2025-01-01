// const user =  {
//     "id": "uuid",
//     "phone": "+7 913 743 24 35",
//     "name": "Иван",
//     "email": "ivan@example.com",
//     "gender": "male"
// }

const server = require("../routes/router");
const sql = require("../interactions_BD");
const have_patient = require("./find_patient_phone");

exports.add_patient = async function (req, res) {
    if(!req.body) {
        console.log('add_patient: ', err)
        res.status(500)
        res.json('Err body')
        return
    }
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const gender = req.body.gender;
    // console.log('start add_patient')

    let tmp = ''
    try {
        // const h_phone = await have_patient.get_find_patient_phone(phone)
        // console.log(h_phone.answer)
        // if(h_phone.answer.length === 0){
        //     console.log('Empty')
        // }
        await sql.add_('patients', req.body)
        console.log('Line next fn add_')
        tmp = 'OK'
    } catch(err) {
        console.log(err)
        tmp = 'add patient Error'
    } finally {
        // ToDo Where using response OK fn add_patient()
        res.json(tmp)
    }

};