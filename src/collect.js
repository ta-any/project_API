const { PrismaClient } = require('@prisma/client')
const client = require("../database");
const moment = require("moment");
const response = {
    msg: "",
    status: true
}

//Сюда приходят API?
exports.protocol =  async function () {
    console.log('COLLECT start...')
    try {
        let tomorrow = moment().zone(0)
            .add(1, 'days').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format();
        const array = await client.get_collection_('schedule',[{
            is_free: false,
            date: tomorrow,
            tasks: {none: {}}
        }, {
            patients: true,
        }])

        console.log("Get list task for status - ready: ", array)

        let list_note = array.map(el => {
            return  {
                number_phone: el.patients.phone,
                status: 1,
                count_calls: 0,
                schedule_id: el.id,
            }
            // return data
        })
        console.log('List on record: ', list_note)
        const lst = await  client.record_('tasks', list_note)
        response.msg = 'from ..src\\collect.js: collect - OK!'
    } catch (ERROR) {
        response.msg = 'from ..src\\collect.js: collect - Ne OK!'
        response.status = false
        console.log(ERROR)
    } finally {
        console.log(response.msg)
    }
}



// collect().then(
//     function (result) {
//       return result
//     },
//     function (err) {
//         console.log(response.msg)
//     }
// )
