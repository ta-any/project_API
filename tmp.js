console.log(111)
const v = {}
v.servey = {
    info_doctors: { id: 4, name: 'Громов', spec: 'Терапевт', price: 3500 },
    isDoc: true,
}
v.servey.date = '2025-01-24T00:00:00'

//////////////////////////////////////////////////////////////////////////
const dayjs = require('dayjs')
const axios = require('axios');

console.log("Start block Расширинный поиск даты со свободными слотами")

async function startSearch(){
    console.log('Start startSearch()')

    v.servey.allDaysVariants = getAllDateVariants(v.servey.date)
    console.log('Lst allDaysVariants +- 3day', v.servey.allDaysVariants)

    for(let day of v.servey.allDaysVariants){
        if(!('cashDate' in v.servey)){
            console.log('Nope')
            v.servey.cashDate = []
        } else {
             console.log('Отправка day на поиск свободных слотов: ', day)
             const slots = await walkingForFreeSlotTimeFromAPI(day)
             v.servey.cashDate.push(day)
                if(v.servey.schedule.length != 0 ) {
                    console.log("Filled list free time: ", v.servey.schedule)
                    v.servey.date = day
                    break
                }
        }
    }

}


function getAllDateVariants(isoDate) {
    if (dayjs().isAfter(dayjs(v.servey.date))) return []
    const result = [];

    for (let i = -3; i <= 3; i++) {
        const adjustedDate = new Date(isoDate);
        adjustedDate.setDate(adjustedDate.getDate() + i);
        if (!dayjs(adjustedDate).isSame(dayjs(v.servey.date))) result.push(adjustedDate);
    }
    // console.log("List on day: ", result)
    return  result
}

async function walkingForFreeSlotTimeFromAPI(dayFullFormat){
    // Вернют или  v.isDate = false при неудачи и отсутствии свободных слотов на dayFullFormat
    // Или массив слотов свободного времени для конкретного врача и конкретную дату(dayFullFormat)
    // v.isDate = true
    // v.servey.schedule = response.data.answer

    let localDataset = {
        data: dayFullFormat, // example "2024-12-25T00:00:00"
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
        // Перезапишит есть ли расписание на дату или нет
        if(response.data.answer === 'no date'){
            v.isDate = false
        } else {
            v.isDate = true
            v.servey.schedule = response.data.answer
        }
    }).catch((ERROR) => {
        v.is_error = true
        console.log("ERROR walkingForFreeSlotTimeFromAPI: ", ERROR);
        return null
    })
}

await startSearch().catch((error) => {
    v.is_error = true
    console.log("ERROR block расширинный поиск даты со свободными слотами: ", error);
}).finally(finish)