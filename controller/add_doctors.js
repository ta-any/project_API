const server = require("../routes/router");
const sql = require("../interactions_BD");

exports.add_doctors = async function (req, res){
    if(!req.body) {
        console.log(err)
        res.status(500)
        res.json('Err body')
        return
    }
    const name = req.body.name;
    const spec = req.body.spec;
    const price = req.body.price;

    let tmp = ''
    try {
        await sql.add_('doctors', req.body)
        tmp = 'OK'
    } catch(err) {
        console.log(err)
        tmp = 'Error'
    } finally {
        res.json(tmp)
    }
}

