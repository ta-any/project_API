const client = require("../database");
const { PrismaClient } = require('@prisma/client')
let response = {
    msg: '',
    status: true
}

exports.protocol =  async function () {
    console.log('CALLER start...')
    try {
        const tasks = await client.get_collection_('tasks', [{
            status: 1,
        }, {}])

        // console.log('Return obj whole tasks with status - ready', tasks)
        // API

        let list_note = tasks.map(obj => {
            return {
                status_id: 2,
                phone: obj.number_phone,
                Id_API: String(Math.floor(Math.random() * 1000)), // ToDo add Id_API
                task_id: obj.Id,
            }
            // return data - obj
        })
        // console.log('Return list objects whole tasks with status - ready', list_note)
        await client.record_('calls', list_note)

        for (const index in tasks) {
            let number = tasks[index].count_calls + 1
            let id = tasks[index].Id

            await client.update_('tasks', [{Id: id}, {
                count_calls: number,
                status: 2
            }])
        }

        response.msg = 'from ..src\\caller.js: caller - OK!'

    } catch (ERROR) {
        response.msg = "from ..src\\caller.js: caller - Ne OK"
        response.status = false
        console.log(ERROR)

    } finally {
        console.log(response.msg)
    }
}
