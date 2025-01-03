const axios = require('axios');
console.log("Start block Принимаем дату от клиента")

async function main() {
    console.log('Start main()')
    console.log(v.listen)
    const resDate = await responseDataFormatISO(v.listen);

    v.servey.date = resDate
    const resAPI = await sendRequestToMyAPI(resDate);
}
async function responseDataFormatISO(queryDate){
    console.log('Start responseDataFormatISO...')
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://lib.robotmia.ru/hors/get-date.php?text=${encodeURI(queryDate)}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log('From responseDataFormatISO config: ', config)

    return await axios.request(config).then((responseJSON) => {
        console.log('ответ API lib.robotmia: ', responseJSON)
        const object = JSON.parse(responseJSON.data.horsResponse);

        if(object.Dates.length === 0){
            return null;
        } else {
            return object.Dates[0].DateFrom
        }
    }).catch((error) => {
        v.is_error = true
        console.log("ERROR responseDataFormatISO: ", error);
        return null
    })
}

async function sendRequestToMyAPI(date){
    console.log('Start sendRequestToMyAPI...')
    const date_recognized = (date === null) ? false : true;
    console.log('Alert date_recognized status: ', date_recognized)
    console.log('Alert date_recognized: ', date)
    if(date_recognized) {
        let localDataset = {
            data: date,
            is_free: 1
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
        console.log('From sendRequestToMyAPI config: ', config)
        // 'API accepts JSON.answer with array slots time'

        return await axios.request(config).then((response) => {
            console.log('From sendRequestToMyAPI response: ', response.data)
            if(response.data.answer === 'no date'){
                v.is_date = false
            } else {
                v.is_date = true
                v.servey.schedule = response.data.answer
            }
        })
    } else {
        v.is_date = date_recognized
    }
    console.log('Status date: ', v.is_date)
}

await main().catch((error) => {
    v.is_error = true
    console.log("ERROR block Принимаем дату от клиента : ", error);

}).finally(finish)
