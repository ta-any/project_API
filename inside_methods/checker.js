const moment = require("moment");

class Checker {
    constructor() {}
    slotSchedule(info) {
        let data = info[0]
        let response = {
            status: true,
            msg: ''
        }

        let currentDate = moment().zone(0).toISOString();
        let day = moment(data['date']).format('YYYY-MM-DD')
        let expected_date = moment(`${day} ${data['time_from']}`).toISOString()
        console.log('currentDate текущая дата для проверки записи к vрачу ', currentDate)
        console.log('предпологаемая день записи', day)
        console.log("предпологаемая time записи", data['time_from'])


        if(Object.keys(data).length === 0 ) {
            response['status'] = false
            response['msg'] = 'BREAKE EXIST'
        } else if(moment(currentDate).isAfter(expected_date)){
            response['status'] = false
            response['msg'] = 'BREAKE DatA'
        } else if( data['is_free'] == 0 ){
            response['status'] = false
            response['msg'] = 'BREAKE is_free'
            console.log(111)
        } else {
            response['msg'] = 'correct: Record added'
        }
        return response
    }
}

module.exports = new Checker()

