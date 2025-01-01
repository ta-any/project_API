const server = require("../routes/router");
const sql = require("../interactions_BD");

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

    // ToDo relocate fn phoneFormat to module check_data
    const phoneFormat = (s, plus = true) => {
        const startsWith = plus ? '+7' : '8';

        let phone = s.replace(/[^0-9]/g, '');
        if (phone.startsWith('7') && plus) {
            phone = phone.substr(1);
        }
        if (phone.startsWith('8')) {
            phone = phone.substr(1);
        }

        return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `${startsWith} $1 $2 $3 $4`);
    };


    try{
        const FPN = phoneFormat(phone);
        console.log('find_patient', new Date(), FPN)

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