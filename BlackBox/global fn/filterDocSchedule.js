const servey = {}
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
// v.servey add global v construction
// fn on construction f.name_fn()

//////////////////////////////////////////////////////////////////////

function filterSchedule({ doctor_id }) {
    // Исходный объект остаётся неизменным
    return [ ...servey.scheduleLST ].filter(obj => {
        return  obj.doctor_id === doctor_id

    })
}
let dataset = filterSchedule({ doctor_id: 3 })
console.log(dataset)

