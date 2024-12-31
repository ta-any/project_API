const express = require('express')
const router = express.Router()


const ADD_P = require("../controller/add_patient.js");
const ADD_D = require("../controller/add_doctors.js");
const ADD_appointment = require("../controller/appointment.js");
const GET_appointment = require("../controller/get_appointment.js")
const GET_patient_id =  require("../controller/find_patient_phone.js")
const SEND_call =  require("../controller/send_robocall.js")
const CHECK_doctors = require("../controller/chek_doctors.js")

router.get('/about', (req, res) => {
    res.send("Tst")
})

router.post("/add_patient", ADD_P.add_patient);
router.post("/add_doctors", ADD_D.add_doctors);
router.post("/appointment", ADD_appointment.appointment);
router.post("/get_appointment", GET_appointment.get_appointment);
router.post("/find_patient_phone", GET_patient_id.get_find_patient_phone);
router.post("/robocall", SEND_call.send); // ToDo change name(?)
router.post('/check_doctors', CHECK_doctors.check_doctors_name )


router.get('/about', (req, res) => {
    res.send('SERVER START')
})

module.exports = router