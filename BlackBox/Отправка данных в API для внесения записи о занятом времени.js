// v.servey add global v construction

console.log('Start block: record appointment...')
const axios = require('axios');


let localDataset = {
    "patient_id": 3,
    "doctor_id": 4,
    "schedule_id": 3   // Where???
}

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${v.API_baseurl}/server/appointment`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: localDataset
};
console.log('config for method is_personalityDoc: ', config)

axios.request(config).then((response) => {
    console.log('response appointment: ', response.data)

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