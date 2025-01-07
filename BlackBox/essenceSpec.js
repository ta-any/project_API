// Essence specialty Doc for SPUTNYC
// Check content essence or return error
// Find first doctor with free time-date
// Speaker
// v.servey add global v construction

console.log('Фиксируем профиль(специальность) врача...')
const essenceNumber = 509
const axios = require('axios');
let essence //doubt: const or let

if(v.intent.entity_search != null && v.intent.entity_search.length !== 0){
    console.log('Спутник, что-то нашел...')
    essence = v.intent.entity_search.find(elem => elem.Entity_id === essenceNumber && elem.FullMatch > 0)
    console.log('Our medicalSpecialty intent: ')
    console.log(essence)
}
// inspection(инспекция) essence
// print error...
if(essence === undefined){
    v.servey.isDoc = false
    console.log('Empty essence...')
    finish()
    return
}

// collect stuff from SPUTNYC
let localDataset = {
    spec: essence.NormalPhrase, // ToDo check
    /* where properties with именительный падеж...*/

}

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${v.API_baseurl}/server/is_personalityDoc`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: localDataset
};
console.log('config for method is_personalityDoc: ', config)

axios.request(config).then((response) => {
    console.log('response is_personalityDoc: ', response.data)

    v.servey.isDoc =  response.data.isDoc
    if(v.servey.isDoc){
        v.servey.info_doctors = response.data.lstDoc[0]

        console.log('info_have doctor v.servey.isDoc: ', v.servey.isDoc)
        console.log(v.servey.info_doctors)
    }

}).catch((error) => {
    v.is_error = true
    console.log("ERROR: ", error);
}).finally(finish)