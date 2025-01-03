// v.servey add global v construction

const axios = require('axios');
console.log("Start block Принимаем время от клиента")
// v.servey.slotsFreeTime провеить массив перед записью наа аопределенную дату-время
// уточнить свободно ли это место для записи, не ошибся ли клиент (НЕТ)
// переменная  finallyFree

// let d = new Date('2024-12-27T10:00:00')
// console.log(d.toLocaleTimeString()); //10:00:00

async function mainTime() {
    console.log('Start mainTime()')
    console.log(v.listen)
    const resDate = await responseTimeFormatISO(v.listen);
}

async function responseTimeFormatISO(queryDate){
    console.log('Start responseTimeFormatISO...')
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://lib.robotmia.ru/hors/get-date.php?text=${encodeURI(queryDate)}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log('From responseTimeFormatISO config: ', config)

    return await axios.request(config).then((responseJSON) => {
        console.log('ответ API lib.robotmia about time: ', responseJSON)
        const object = JSON.parse(responseJSON.data.horsResponse);
        let D = new Date(object.DateFrom)
        let desiredTime = D.toLocaleTimeString()

    })
        .catch((error) => {
            v.is_error = true
            console.log("ERROR responseTimeFormatISO: ", error);
            return null
        })
}

await mainTime().catch((error) => {
    v.is_error = true
    console.log("ERROR block Принимаем время от клиента: ", error);
})
    .finally(finish)
