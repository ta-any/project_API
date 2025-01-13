const client = require("../database");
const { PrismaClient } = require('@prisma/client')
const axios = require('axios');
let response = {
    msg: '',
    status: true
}

async function calltaskAPI(phone = '', dataset){
    axios.post('https://go.robotmia.ru/api/calltask', {
        api_key: "8144aaad-8e24-409d-9e28-088885b9e999",
        project_id: "353",
        phone: phone,
        data: JSON.stringify({dataset})

    }).then(function (response) {
            console.log("Return response calltaskAPI() from caller.js", response);
            console.log("call_task_id: ", response.data.data.call_task_id)

            return response.data.data.call_task_id

    }).catch(function (error) {
        console.log(error);
    });
}

exports.protocol =  async function () {
    console.log('CALLER start...')
    try {
        const tasks = await client.get_collection_('tasks', [{
            status: 1,
        }, {}])

        // console.log('Return obj whole tasks with status - ready', tasks)
        // API
        // Todo Найти данные для data -> dataset
        let list_note = []

        for(let obj of tasks){
            const schedule_id = obj.schedule_id
            const info_slot  = await client.get_collection_('schedule', [{
                id: schedule_id,
            }, {
                patients: true,
                doctors: true,
            }])
            console.log("lst with info slot schedule_id: ", info_slot)

            let config = {
                doctorFullName: info_slot[0].doctors.name,
                patientFullName: info_slot[0].patients.name,
                appointmentDate: info_slot[0].date,
                appointmentTime: info_slot[0].time_from
            }
            console.log("Содержание необходимых данных для звонка: ", config)

            const id_doorbell = await calltaskAPI(obj.number_phone, config)
            console.log("Уникальный Id звонка: ", id_doorbell)

            let data = {
                status_id: 2,
                phone: obj.number_phone,
                Id_API: String(id_doorbell), // ToDo add Id_API
                task_id: obj.Id,
            }
            list_note.push(data)
            // return data - obj
        }

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
