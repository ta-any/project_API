// v.servey add global v construction
// Тыкаемся в базу, чтобы найти новую дату со свободными слотами +-3 дня
// хранить кэш уже проверенных дат
// обновляем текущую дату для записи клиента в базу данных
// перепроверить наличия !доктора! к этому блоку
let servey = {
    info_doctors: { id: 4, name: 'Громов', spec: 'Терапевт', price: 3500 },
    isDoc: true,
    date: '2025-01-24',
    cashDate: ['2025-01-21', '2025-01-22'],
//     '2025-01-23', '2025-01-25', '2025-01-26', '2025-01-27'
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
const axios = require('axios');
console.log("Start block Расширинный поиск даты со свободными слотами")

function getAllDateVariants(isoDate) {
    const inputDate = new Date(isoDate);
    const today = new Date();
    // today.setHours(0, 0, 0, 0);
    if (inputDate <= today) return []
    const result = [];

    for (let i = -3; i <= 3; i++) {
        const adjustedDate = new Date(inputDate);
        adjustedDate.setDate(inputDate.getDate() + i);
        if (adjustedDate > today) {
            result.push(adjustedDate.toISOString().split('T')[0]); // Добавляем в формате YYYY-MM-DD
        }
    }

    return result.filter(data => data !== isoDate)
}
servey.allDateVariants = getAllDateVariants(servey.date)
console.log('Lst allDateVariants +- 3day', servey.allDateVariants)

// расширить функцию, есть докотр(возможно все еще массив докторов по специалитету)
async function walkingForFreeSlotTimeFromAPI(date){
    let localDataset = {
        data: date,
        is_free: 1,
        doctor_id: servey.info_doctors.id,
    };
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${v.API_baseurl}/server/get_appointment`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : localDataset
    };
    console.log('From walkingForFreeSlotTimeFromAPI config: ', config)
    // 'API accepts JSON.answer with array slots time'

    return await axios.request(config).then((response) => {
        console.log('From walkingForFreeSlotTimeFromAPI response: ', response.data)
        // Перезапишит есть ли дата или нет
        if(response.data.answer === 'no date'){
            v.is_date = false
        } else {
            v.is_date = true
            v.servey.schedule = response.data.answer
        }
    })
}

async function extendedSearch(){
    let verifiedDate = null;
    if('cashDate' in servey){
        servey.allDateVariants.forEach(value => {
            if (!servey.cashDate.includes(value) && verifiedDate === null) {
                verifiedDate = value;
            }
        });
        if(verifiedDate !== null) servey.cashDate.push(verifiedDate)
        // console.log('next: ', verifiedDate)
    } else {
        verifiedDate = servey.allDateVariants[0]
        servey.cashDate = [verifiedDate]
    }
    //Обновляем на конструкторе текущую дату для звписи клиента
    v.servey.date = verifiedDate
    console.log('Отправка verifiedDate на поиск свободных слотов: ', verifiedDate)
    await walkingForFreeSlotTimeFromAPI(verifiedDate)

}

await extendedSearch().catch((error) => {
    v.is_error = true
    console.log("ERROR block расширинный поиск даты со свободными слотами: ", error);
}).finally(finish)
