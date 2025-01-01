const axios = require('axios');
console.log('Block free slots time')

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