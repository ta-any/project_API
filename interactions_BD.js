const mysql = require("mysql2/promise");
const check = require("./inside_methods/checker");

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
        console.log('Start get_schedule_doctors...')
        let error_description = ''
        let sql = this.connection()
        try {
            const [rows] = await sql.query(`SELECT * FROM schedule WHERE date = '${day}'`);
            let result = rows

            if(rows.length === 0) return 'no date'
            if(doctor_id !== null){
                result = rows.filter(obj => obj.doctor_id === doctor_id)
            }

            if(slot_time !== -1){
                const standard = [0, 1]
                if(!standard.includes(slot_time)) return 'Error: no correct is_free'
                result = result.filter(obj => obj.is_free === slot_time)
            }

            result.map(item => {
                item.date = new Date(item.date);
                item.date.setHours(item.date.getHours()+7)
            })
            console.log(result)

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
    async get_count_visit(doctor, patient){
        let sql =  this.connection()
        console.log('receive doctor ID into fn: ', doctor)
        console.log('receive patient ID into fn: ', patient)
        try{
            const [rows] = await sql.query(`SELECT doctor_id, COUNT(*) as count_patient FROM schedule WHERE patient_id = ${patient} AND  doctor_id = ${doctor} GROUP BY doctor_id;`);
            let count = rows.length === 0 ? 0 : rows[0].count_patient

            console.log('From get_count_visit(doctor, patient) return data from schedule: ', count)
            return count
        }
        catch (ERROR) {
            console.log('from class BD fn get_count_visit()', ERROR)
        } finally {
            this.close_connection(sql)
        }
    }

}

module.exports = new BD()
