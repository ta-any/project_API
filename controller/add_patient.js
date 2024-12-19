// const user =  {
//     "id": "uuid",
//     "phone": "+7 913 743 24 35",
//     "name": "Иван",
//     "email": "ivan@example.com",
//     "gender": "male"
// }

const server = require("../routes/router");
const sql = require("../interactions_BD");

exports.add_patient = async function (req, res) {
    if(!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const gender = req.body.gender;

    let tmp = ''
    try {
        await sql.add_('patients', req.body)
        tmp = 'OK'
    } catch(err) {
        console.log(err)
        tmp = 'Error'
    } finally {
        res.json(tmp)
    }

};