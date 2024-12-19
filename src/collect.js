const { PrismaClient } = require('@prisma/client')
const moment = require("moment");

const response = {
    msg: "from ..src\\collect.js",
    status: true
}

async function collect () {
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

        console.log(array)

        array.forEach(el => {
            const data = {
                number_phone: el.patients.phone,
                status: 1,
                count_calls: 0,
                schedule_id: el.id,
            }


            client.record_('tasks', data)
        })
        response.msg += ' collect()' + ' OK!'
    } catch (ERROR) {
        response.msg += ' collect()' + ' Ne OK!'
        response.status = false
        console.log(ERROR)
    } finally {
        console.log(response.msg)
    }
}
collect().then(
    function (result) {
      return result
    },
    function (err) {
        console.log(response.msg)
    }
)
