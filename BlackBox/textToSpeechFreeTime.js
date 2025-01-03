// v.servey add global v construction
// хорошо бы вынести fn textToSpeech в глобальную внутри конструктора

let servey = {
    info_doctors: { id: 4, name: 'Громов', spec: 'Терапевт', price: 3500 },
    isDoc: true,
}
servey.scheduleLST = [
    {
        "id": 6,
        "doctor_id": 4,
        "date": "2024-12-25T00:00:00.000Z",
        "time_from": "11:00:00",
        "time_to": "11:30:00",
        "is_free": 1,
        "patient_id": null,
        "type": null
    },
    {
        "id": 7,
        "doctor_id": 4,
        "date": "2024-12-25T00:00:00.000Z",
        "time_from": "11:30:00",
        "time_to": "12:00:00",
        "is_free": 1,
        "patient_id": null,
        "type": null
    },
    {
        "id": 11,
        "doctor_id": 4,
        "date": "2024-12-25T00:00:00.000Z",
        "time_from": "15:30:00",
        "time_to": "16:00:00",
        "is_free": 1,
        "patient_id": null,
        "type": null
    },
    {
        "id": 12,
        "doctor_id": 4,
        "date": "2024-12-25T00:00:00.000Z",
        "time_from": "16:00:00",
        "time_to": "16:30:00",
        "is_free": 1,
        "patient_id": null,
        "type": null
    },
    {
        "id": 13,
        "doctor_id": 2,
        "date": "2024-12-25T00:00:00.000Z",
        "time_from": "16:00:00",
        "time_to": "16:30:00",
        "is_free": 1,
        "patient_id": null,
        "type": null
    },
    {
        "id": 14,
        "doctor_id": 2,
        "date": "2024-12-25T00:00:00.000Z",
        "time_from": "15:30:00",
        "time_to": "16:00:00",
        "is_free": 1,
        "patient_id": null,
        "type": null
    }
]
/////////////////////////////////////////////////////////////
// В это время мы уверены, что слоты свободного времении точно есть?
// Или нужна проверка здесь

console.log('Start block filterTime')
const doctor = servey.info_doctors.id
function textToSpeech(lst, doctor){
    const scheduleDoc = lst.filter((slot) => slot.doctor_id === doctor);
    const slots = scheduleDoc.map(slot => slot.time_from.slice(0, -3))
    const last = slots.length - 1

    const txt = slots.reduce((acc, current, index) => {
        let fragment = index === last ? ' и ' + current : ', '  + current //+ ', '
        return acc + fragment
    }, '').slice(2).trim()

    // v.servey.textToSpeech = txt
    // v.servey.isTime = true
//     v.servey.slotsFreeTime = slots

}

textToSpeech(servey.scheduleLST, doctor)
// console.log('textToSpeech() return: ', servey.textToSpeech)