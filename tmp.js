// Essence specialty Doc for SPUTNYC
// Check content essence or return error
// Find first doctor with free time-date
// Speaker

// v.servey add global v construction

console.log('Фиксируем специальность врача...')
// const essenceNumber = 509
// const axios = require('axios');
// let essence
let essence = {
    NormalPhrase: 'терапевт'
}

let api = {

}

// if(v.intent.entity_search != null && v.intent.entity_search.length !== 0){
//     console.log('Спутник, что-то нашел...')
//     essence = v.intent.entity_search.find(elem => elem.Entity_id === essenceNumber && elem.FullMatch > 0)
//     console.log('Our medicalSpecialty intent: ')
//     console.log(essence)
// }

// inspection(инспекция) essence
// print error...
// if(essence === undefined){
//     v.servey.haveSpecialty = false
//     console.log('Empty medicalSpecialty essence...')
//     finish()
//     return
// }

// collect stuff for config
let localDataset = {
    spec: essence.NormalPhrase, // ToDo check
}

// let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: `${v.API_baseurl}/server/check_spec`,
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data: localDataset
// };
// console.log('config for medicalSpecialty: ', config)


// axios.request(config).then((response) => {
//     console.log('response check_spec: ', response.data)

// servey.haveSpec =  response.data.haveSpec
servey.haveSpec = api.haveSpec
// v.servey.info_doctors =
console.log('info_have doctor v.servey.haveDoc: ', servey.haveSpec)

// }).catch((error) => {
//     v.is_error = true
//     console.log("ERROR: ", error);
// }).finally(finish)