const mysql = require("mysql2/promise");
const check = require("./check_data");

class BD {
    constructor() {
        this.host = "localhost"
        this.user = "root"
        this.database = "bd"
        this.password = "root"
    }
    connection(){
         return mysql.createPool({
             host: this.host,
             user: this.user,
             database: this.database,
             password: this.password,
         })
    }
    close_connection(pool) {
        pool.end((err) => {
            if(err) {
                console.log(err)
            }
        });
    }
    get_str_with_(symbol, array){
        let string = ''
        for(let char in array){
            string += symbol + ', '
        }
        return string.slice(0, -2)
    }

    async add_(table, obj){
        let sql =  this.connection()
            try {
                let keys = Object.keys(obj)
                let val = Object.values(obj)
                let options = keys.join(', ')
                const info = await sql.execute(`INSERT INTO ${table} ( ${options}) VALUES (${this.get_str_with_('?', val)})`, val)

                return info
            } catch (e) {
                console.log('add_()', e)
                throw new Error(e)
            } finally {
                this.close_connection(sql)
            }

    }
    async get_schedule_doctors(day, doctor_id = null, slot_time = -1){
        let error_description = ''
        let sql = this.connection()
        try {
            const [rows] = await sql.query(`SELECT * FROM schedule WHERE date = '${day}'`);
            let result = rows

            if(rows.length === 0) return 'no date'
            if(doctor_id !== null){
               result = result.filter(obj => obj.doctor_id === doctor_id)
            }

            if(slot_time !== -1){
                const standart = [0, 1]
                if(!standart.includes(slot_time)) return 'Error: no correct is_free'
                result = result.filter(obj => obj.is_free === slot_time)
            }

            return result

        } catch (ERROR) {
            console.log('from class BD get_schedule_doctors()', ERROR)
        } finally {
            this.close_connection(sql)
        }
    }

    async get_data_schedule(option){
        let sql =  this.connection()
        try{
            const [rows] = await sql.query(`SELECT * FROM schedule WHERE id = ${option}`);
            return rows
        }
        catch (ERROR) {
            console.log('from class BD fn get_data()', ERROR)
        } finally {
            this.close_connection(sql)
         }

    }

    async update_(table, changes){
        let sql =  this.connection()
        try {
            const info = await sql.execute(`
                UPDATE ${table}
                SET ${changes['name_is_free']} = '${changes['on_ny_is_free']}', ${changes['name_patient_id']} = '${changes['on_ny_patient']}', ${changes['name_type']} = '${changes['on_ny_type']}'
                WHERE ${changes['id']} = ${changes['option_id']}`)

        } catch (ERROR){
            console.log('from class BD update_()', ERROR)
        } finally {
            this.close_connection(sql)
        }
    }

    async get_patient(phone){
        let sql =  this.connection()
        try{
            const [rows] = await sql.query(`SELECT * FROM patients WHERE phone = "${phone}"`);
            return rows
        }
        catch (ERROR) {
            console.log('from class BD fn get_patient()', ERROR)
        } finally {
            this.close_connection(sql)
        }
    }
}

module.exports = new BD()
