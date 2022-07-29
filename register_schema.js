const mongo = require('mongoose')
module.exports = mongo.model("studata", new mongo.Schema({
    sname: String,
    fname: String,
    mname: String,
    sname_h: String,
    fname_h: String,
    mname_h: String,
    sec: String,
    uroll: Number,
    cpi: Number,
    spec: String,
    contact: Number,
    uid: Number
}))