const moment = require("moment");
class Check {
    constructor() {
    }
    check_(info) {
        let data = info[0]
        let ob = {
            status: true,
            msg: ''
        }

        let currentDate = moment().zone(0).toISOString();
        // .toISOString()
        let day = moment(data['date']).format('YYYY-MM-DD')
        let expected_date = moment(`${day} ${data['time_from']}`).toISOString()
        console.log('currentDate текущая дата для проверки записи к vрачу ', currentDate)
        console.log('предпологаемая день записи', day)
        console.log("предпологаемая time записи", data['time_from'])


        if(Object.keys(data).length === 0 ) {
            ob['status'] = false
            ob['msg'] = 'BREAKE EXIST'
        } else if(moment(currentDate).isAfter(expected_date)){
            ob['status'] = false
            ob['msg'] = 'BREAKE DatA'
        } else if( data['is_free'] == 0 ){
            ob['status'] = false
            ob['msg'] = 'BREAKE is_free'
            console.log(111)
        } else {
            ob['msg'] = 'correct: Record added'
        }
        return ob
    }
}

module.exports = new Check()

