const qr = require('qrcode-terminal');
const { Client, LocalAuth, List, MessageMedia } = require('whatsapp-web.js');
const List_schema = require('./List_schema');
const data = require('./Mdata')
const pyq_schema = require('./pyq_schema')

const fs = require('fs')
var urlToImage = require('url-to-image');
const https = require("https");



function getImage(r, from) {
    const file = fs.createWriteStream("img.jpg");
    https.get("https://glauniversity.in:8103/" + r + ".jpg", response => {
        var stream = response.pipe(file);

        stream.on("finish", function() {
            console.log("done")
            const media = MessageMedia.fromFilePath('img.jpg');
            console.log(media.filename)
            client.sendMessage(from, media);
        });



    })
}

function getImage_caption(from, captionr, r) {
    const file = fs.createWriteStream("img.jpg");

    https.get("https://glauniversity.in:8103/" + r + ".jpg", response => {
        var stream = response.pipe(file);

        stream.on("finish", function() {
            console.log("done")
            const media = MessageMedia.fromFilePath('img.jpg');
            console.log(media.filename)
            client.sendMessage(from, media, { caption: captionr });
        });



    })
}



const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one"
    }),
    // session: sessionCfg

});

client.on('qr', (qr1) => { //QR CODE GENERATTOR
    qr.generate(qr1, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async(msg) => {
    if (msg.body.search("find ") >= 0) {
        var r = msg.body;

        r = r.replace('find', "");
        r = parseInt(r);


        const x = data.find(d => d.univ_rollno == r)

        if (x == undefined) {
            msg.reply("ROLLNO. DOES NOT EXIST!!!")
        } else {
            const str = "*😈    🆈🅾🆄🆁🆂 🆃🆁🆄🅻🆈    😈* \n\n\n" +
                "⭕ 𝐑𝐎𝐋𝐋 𝐍𝐎 :" + x.univ_rollno + "\n" +
                "👨‍💻 𝐒𝐭𝐮𝐝𝐞𝐧𝐭 𝐍𝐚𝐦𝐞 :" + x.sname + "\n" +
                "☢  🅲🅿🅸 :" + x.cpi + "\n" +
                "👨 𝐅𝐚𝐭𝐡𝐞𝐫 𝐍𝐚𝐦𝐞 :" + x.fname + " / " + x.fname_hindi + "\n" +
                "👩 𝐌𝐨𝐭𝐡𝐞𝐫 𝐍𝐚𝐦𝐞 " + x.mname + " / " + x.mname_hindi;


            getImage_caption(msg.from, str, x.univ_rollno)

        }
    } else if (msg.body.search("photo ") >= 0) {
        var r = msg.body;

        r = r.replace('photo', "");
        r = parseInt(r);


        getImage(r, msg.from)






    } else if (msg.body == "pyq list") {

        // const media = MessageMedia.fromFilePath('');
        // client.sendMessage(msg.from, media);

        client.sendMessage(msg.from, List_schema);

    } else if (msg.body.search("#glaupdf")) {
        const a = msg.body.split("#glaupdf")[1];
        console.log(a)
        if (a == "5sm") {
            const media = MessageMedia.fromFilePath('./VM.pdf');
            client.sendMessage(msg.from, media);
        } else if (a == "5se") {

            const media = MessageMedia.fromFilePath('./VE.pdf');
            client.sendMessage(msg.from, media);
        } else if (a == "6sm") {
            const media = MessageMedia.fromFilePath('./VIM.pdf');
            client.sendMessage(msg.from, media);
        } else if (a == "6se") {
            const media = MessageMedia.fromFilePath('VIE.pdf');
            client.sendMessage(msg.from, media);
        }
    } else {

        console.log("|||||||||");
        // client.sendMessage(msg.from,pyq_schema );
    }
});





client.initialize();