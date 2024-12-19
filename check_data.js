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

        let currentDate = moment().toISOString();
        let day = moment(data['date']).format('YYYY-MM-DD')
        let expected_date = moment(`${day} ${'10:30:00'}`).toISOString()

        if(Object.keys(data).length === 0 ) {
            ob['status'] = false
            ob['msg'] = 'BREAKE EXIST'
        } else if(moment(currentDate).isSameOrBefore(expected_date)){
            ob['status'] = false
            ob['msg'] = 'BREAKE DatA'
        } else if( data['is_free'] == 0 ){
            ob['status'] = false
            ob['msg'] = 'BREAKE is_free'
            console.log(111)
        } else {
            ob['msg'] = 'correct'
        }
        return ob
    }
}

module.exports = new Check()

