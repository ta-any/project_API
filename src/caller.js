const client = require("../database");
const { PrismaClient } = require('@prisma/client')
let response = {
    msg: 'from ..src\\caller.js',
    status: true
}

//  count_calls: 0,

async function caller () {
    try {
        const tasks = await client.get_collection_('tasks', [{
            status: 1,
        }, {}])
        const phones = tasks.map(obj => obj.number_phone)
        console.log(phones)

        tasks.forEach(obj => {
            client.record_('calls', {
                status_id: 2,
                phone: obj.number_phone,// ToDo fill date (on) record
                Id_API: 111, // ToDo change
                task_id: obj.Id
            //     phone, id_API_MIA,
            })
        })

        // let note_status = [{status_task: 'ready'}, {status_task: 'process'}]
        // client.update_('tasks', note_status)

        response.msg += ' caller() OK!'

    } catch (ERROR) {
        response.msg += " caller() Ne OK"
        response.status = false
        console.log(ERROR)

    } finally {
        console.log(response.msg)
    }
}
caller().then(
    function (result) {
        return result
    },
    function (err) {
        console.log(response.msg)
    }
)