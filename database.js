const { PrismaClient } = require('@prisma/client')
const moment = require("moment/moment");
const response = {
    msg: "from database.js",
    status: true
}

class database {
    constructor() {}

    async get_collection_ (from, options){
        const client = new PrismaClient()
        await client.$connect()
        const [where, include] = options

        try {
            const collection = await client[from].findMany({
                where: where,
                include: include,
            })
            response.msg += ' get_collection_() OK!'
            return collection

        } catch(ERROR) {
            response.msg += " get_collection_() Ne OK"
            response.status = false
            console.log(ERROR)
        }  finally {
            client.$disconnect()
            console.log(response.msg)

        }

    }

    async record_(to, list_note){
        const client = new PrismaClient()
        await client.$connect()
        try {
            console.log('Start record Create_note')
            const create_note = await client[to].createMany({
                data: list_note,
            })
            console.log('Create_note: ', create_note)
            response.msg += ' record_() OK! record!'
        } catch(ERROR) {
            console.log(ERROR)
            response.msg += " record_() Ne OK"
            response.status = false
        }  finally {
            client.$disconnect()
            console.log(response.msg)
        }
    }

    async update_(to, note){
        const client = new PrismaClient()
        await client.$connect()
        const [change, update] = note
        try {
            const result = await client[to].updateMany({
                where: change,
                data: update
            })
            console.log(`Change in ${to} table, option ${note}`)

            response.msg += ' update_() OK! update info!'
        } catch(ERROR) {
            console.log(ERROR)
            response.msg += " update_() Ne OK"
            response.status = false
        }  finally {
            client.$disconnect()
            console.log(response.msg)
        }
    }
}

module.exports = new database()
