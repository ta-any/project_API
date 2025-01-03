const axios = require('axios');
console.log('Block free slots time')

// v.servey.info_doctors
// v.servey.haveDoc = true
// v.servey.scheduleLST
const scheduleLST =    [
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

let localDataset = {
    doctor_id: v.servey.info_doctors.id,
    date: v.servey.date,
    is_free: 1
}

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${v.API_baseurl}/server/get_appointment`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: localDataset
};
console.log('config for get_appointment: ', config)

axios.request(config).then((response) => {
    console.log('ответ API расписание доктора: ', response.data.answer)
    let lstSlots = response.data.answer
    if(lstSlots.length !== 0){
        v.servey.freeSlots = lstSlots
        console.log('List time: ', v.servey.freeSlots)
        let line = ''
        lstSlots.forEach(doc => {
            let time_from = doc.time_from.slice(0, -3)
            line += time_from + ', '
        })
        v.lineStr = line.slice(0, -2)
        v.isTime = true
    } else {
        v.isTime = false
    }
})
    .catch((error) => {
        v.is_error = true
        console.log("ERROR получение распмсания по doctor_id: ", error);
    })
    .finally(finish)
