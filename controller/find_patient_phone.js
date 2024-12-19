const server = require("../routes/router");
const sql = require("../interactions_BD");

let response = {
    msg: 'from ..controller/send_robocall.js',
    status: true
}

exports.get_find_patient_phone = async function (req, res) {
    if (!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }

    const phone = req.body.phone;

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
        const formatePhoneNumber = phoneFormat(phone);
        console.log(formatePhoneNumber)
        let result = await sql.get_patient(formatePhoneNumber)
        response.answer = result
    }
    catch (ERROR) {
        response = "Ne OK: from find_patient_phone.js"
        console.log(ERROR)
    } finally {
        res.json(response)
    }
}