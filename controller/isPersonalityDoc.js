const server = require("../routes/router");
const sql = require("../database");
// const {is} = require("prisma/build/child");
let response = {
    msg: '',
    status: true
}

// personality doctors
exports.check =  async function (req, res) {
    console.log('check_spec start...')
    if(!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }

    // в зависимости от полученных условий (id или специальность) проверяем
    // есть ли такой врач по id(фамилия) или по специальности
    // возвращаем если успешно
    //  "isDoc": true,
    //   "lstDoc": [{}] // лист с подходящими врачами
    //  При ошибки
    //     "isDoc": false,
    //     "lstDoc": "no correct data"


    let option
    let spec, id
    for (let feature in req.body){
        if(feature === 'spec'){
            spec = "spec"
            option = req.body[`${feature}`]
        } else if(feature === 'doctor_id'){
            id = 'id'
            option = req.body[`${feature}`]
        } else {
            console.log('controller/check_spec(): no correct data')
            response.isDoc = false
            response.msg = 'no correct data: from ..controller\\isPersonalityDoc.js - Ne OK!'
            response.lstDoc = 'no correct data'
            res.json(response)
            return
        }
    }

    try {
        let lst_doc = await sql.get_collection_('doctors', [{[`${spec || id}`]: option}, {}])
        // console.log('list is_doctors: ', lst_doc)

        response.isDoc = (!lst_doc?.length) ? false : true
        response.lstDoc = lst_doc
        // return  have[Doc or Spec]
        // return lst with doctors

        response.msg = 'from ..controller\\isPersonalityDoc.js - OK!'

    } catch (ERROR) {
        response.msg = "from ..controller\\isPersonalityDoc.js - Ne OK!"
        response.status = false
        console.log(ERROR)

    } finally {
        console.log(response.msg)
        res.json(response)
    }
}