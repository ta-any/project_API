const api = {
    "data": {
        "296": {
            "phone_number": "79999252021",
            "init_time": "2022-04-21 10:19:03",
            "status": 22,
            "description": "Окончен по сценарию",
            "robot_duration": 7,
            "whisper_duration": 0,
            "data": {
                "phone": "79999252021"
            },
            "tag": "itistag",
            "goals": [
                {
                    "title": "Клиент понял условия оплаты",
                    "id": 196
                },
                {
                    "title": "Клиент уже оплатил счёт",
                    "id": 190
                }
            ],
            "attempt": 1,
            "dialog": [
                {
                    "type": "human",
                    "text": "Привет МИЯ"
                },
                {
                    "type": "robot",
                    "text": "Привет, Евгений!"
                }
            ],
            "variables": {
                "name": "Евгений"
            }
        },
        "945": {
            "errors": {
                "title": "not_called_yet",
                "details": "Haven't called yet by this call_task_id"
            }
        }
    }
}
const client = require("../database");
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

let response = {
    msg: '',
    status: true
}

async function resultBulkAPI(lstUniqueID){
    axios.post('https://go.robotmia.ru/api/calltask/result-bulk', {
        api_key: "8144aaad-8e24-409d-9e28-088885b9e999",
        project_id: "353",
        call_task_ids: lstUniqueID

    }).then(function (response) {
        console.log("Return response resultBulkAPI() from watchDog.js", response);
        return response

    }).catch(function (error) {
        console.log(error);
    });
}

exports.protocol =  async function () {
    console.log('WATCHDOG start...')
    try {
        const lstUniqueID = await  client.get_collection_('calls', [
            {status_id: 2}, {}
        ])

        const api = await resultBulkAPI(lstUniqueID)
        const body_data_api = api.data //outside information
        const lst_calls = await client.get_collection_('calls', [
            {status_id: 2},
            {tasks: true}
        ])
        // console.log('Return obj whole tasks with status - process', lst_calls)

        let data_for_update_calls = {}
        let data_for_update_tasks = {}

        for (const index in lst_calls) {
            let ID_API = lst_calls[index].Id_API
            // console.log('ID_API from calls: ', ID_API)

            if (ID_API in body_data_api){
                let info_about_call = body_data_api[ID_API]
                // console.log('Have id: ', ID_API)
                // console.log(info_about_call)
                if('status' in info_about_call){
                    if(info_about_call['status'] === 23 || info_about_call['status'] === 21 ) {
                        // console.log('correct status equal 23 or 21: status = 3')
                        data_for_update_calls.status_id = 3
                        data_for_update_tasks.status = 3
                    } else if(lst_calls[index].tasks.count_calls >= 3){
                        // console.log('correct more than three attempts: status = 3')
                        data_for_update_calls.status_id = 3
                        data_for_update_tasks.status = 3
                    } else {
                        // console.log('correct: status = 1')
                        data_for_update_calls.status_id = 1
                        data_for_update_tasks.status = 1
                    }

                } else {
                    // console.log("Error...")
                    // console.log(info_about_call)
                    continue
                }

                data_for_update_calls.info_result = info_about_call
                data_for_update_tasks.info = info_about_call.data
                // console.log("Result on update tables calls and tasks: ")
                // console.log('For table tasks', data_for_update_tasks)
                // console.log('For table calls', data_for_update_calls)

                // let updatedCalls = await client.update_('calls', [{Id_API: ID_API}, data_for_update_calls])
                // let updatedTask = await client.update_('tasks', [{Id: lst_calls[index].tasks.Id}, data_for_update_tasks])
            }
        }
        response.msg = "from ..src\\watchDog.js: watchDog - OK!"

    } catch(ERROR) {
        response.msg = "from ..src\\watchDog.js: watchDog - Ne OK"
        response.status = false
        console.log(ERROR)

    } finally {
        console.log(response.msg)
    }
}

