const qr = require('qrcode-terminal');
const { Client, LocalAuth, List, MessageMedia, RemoteAuth } = require('whatsapp-web.js');
const List_schema = require('./List_schema');
const data = require('./Mdata')
const pyq_schema = require('./pyq_schema')
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const fetch = require('node-fetch')
const fs = require('fs')

const https = require("https");

mongoose.connect('mongodb+srv://messenger:Project%40123@cluster0.10fn5ry.mongodb.net/?retryWrites=true&w=majority').then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000,
        }),
        puppeteer: {
            args: [
                '--no-sandbox',
            ],
        },
    });
    client.on('remote_session_saved', () => {
        console.log("sucessfully saved the session")
    })


    async function getImage(r, from) {
        const x = await fetch('https://glauniversity.in:8103/' + r + '.jpg');
        p = await x.arrayBuffer()
        p = Buffer.from(p);

        var stream = fs.createWriteStream('img.jpg').write(p,

            () => {
                console.log("done")
                const media = MessageMedia.fromFilePath('img.jpg');
                console.log(media.filename)
                client.sendMessage(from, media);

            })



    }


    async function getImage_caption(from, captionr, r) {
        const x = await fetch('https://glauniversity.in:8103/' + r + '.jpg');
        p = await x.arrayBuffer()
        p = Buffer.from(p);

        var stream = fs.createWriteStream('img.jpg').write(p,

            () => {
                console.log("done")
                const media = MessageMedia.fromFilePath('img.jpg');
                console.log(media.filename)
                client.sendMessage(from, media, { caption: captionr });

            })
    }



    // const client = new Client({
    //     authStrategy: new LocalAuth({
    //         clientId: "client-one"
    //     }),
    //     // session: sessionCfg

    // });

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
                    "⭕ University 𝐍𝐎 :" + x.univ_rollno + "\n" +
                    "👨‍💻 𝐒𝐭𝐮𝐝𝐞𝐧𝐭 𝐍𝐚𝐦𝐞 :" + x.sname + "\n" +
                    "⭐ 𝐒𝐞𝐜𝐭𝐢𝐨𝐧 :" + x.sec + "\n" +
                    "☢  🅲🅿🅸 :" + x.cpi + "\n" +
                    "👨 𝐅𝐚𝐭𝐡𝐞𝐫 𝐍𝐚𝐦𝐞 :" + x.fname + " / " + x.fname_hindi + "\n" +
                    "👩 𝐌𝐨𝐭𝐡𝐞𝐫 𝐍𝐚𝐦𝐞 " + x.mname + " / " + x.mname_hindi;


                await getImage_caption(msg.from, str, x.univ_rollno)

            }
        } else if (msg.body.search("photo ") >= 0) {
            var r = msg.body;

            r = r.replace('photo', "");
            r = parseInt(r);


            await getImage(r, msg.from)






        } else if (msg.body.search("sname ") >= 0) {
            var r = msg.body;

            r = r.replace('sname', "");
            r = r.trim();


            console.log(r);
            const x = data.filter((d) => {
                return d.sname.toLowerCase().search(r.toLowerCase()) >= 0;
            })

            var str = "*😈    🆈🅾🆄🆁🆂 🆃🆁🆄🅻🆈    😈* \n\n\n";
            x.map(d => {
                str = str + "\n😎  " + d.sname + " -> " + d.univ_rollno;
            })
            client.sendMessage(msg.from, str)






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
})