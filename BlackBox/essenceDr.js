console.log('Фиксируем ФИО врача...')
const essenceNumber = 508
const axios = require('axios');
let essence

if(v.intent.entity_search != null && v.intent.entity_search.length !== 0){
    console.log('Спутник, что-то нашел...')
    essence = v.intent.entity_search.find(elem => elem.Entity_id === essenceNumber && elem.FullMatch > 0)
    console.log('Our intent: ')
    console.log(essence)
}
if(essence === undefined){
    v.servey.haveDoc = false
    console.log('Empty essence...')
    finish()
    return
}


let localDataset = {
    doctor_id: Number(essence.Value)
}

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${v.API_baseurl}/server/check_doctors`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: localDataset
};
console.log('config for check_doctors: ', config)


axios.request(config).then((response) => {
    console.log('response check_doctors: ', response.data)

    v.servey.haveDoc =  response.data.haveDoc
    v.servey.info_doctors = response.data.info_doctor[0]
    console.log('info_have doctor v.servey.haveDoc: ', v.servey.haveDoc)

}).catch((error) => {
    v.is_error = true
    console.log("ERROR: ", error);
}).finally(finish)