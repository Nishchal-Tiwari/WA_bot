const db_connect = require('./db_connect');
const stsc = require('./register_schema');
const stdata = require('./Mdata');

stdata.forEach(async d => {


    const data = new stsc({
        sname: d.sname,
        fname: d.fname,
        mname: d.mname,
        sname_h: d.sname_h,
        fname_h: d.fname_h,
        mname_h: d.mname_h,
        sec: d.sec,
        uroll: d.uroll,
        cpi: d.cpi,
        // spec: d.spec,
        // contact: d.contact,
        uid: d.uid
    })
    await data.save();

});

db_connect();