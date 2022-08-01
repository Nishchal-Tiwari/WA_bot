const { List } = require('whatsapp-web.js')

module.exports = new List(
    'wait for few minutes after sending code ' //2nd Title
    ,

    'show' //Button text
    ,

    [{
        title: 'Previous Year Questions' //List Heading
            ,
        rows: [
            { title: '5th sem mid-term', description: '#glaupdf5sm' }, //1st List Item 
            { title: '5th sem end-term', description: '#glaupdf5se' },
            { title: '6th sem mid-term', description: '#glaupdf6sm' },
            { title: '6th sem end-term', description: '#glaupdf6se' }
        ]
    }],

    //innerBodyEnd
    '*😈    🆈🅾🆄🆁🆂 🆃🆁🆄  🅻🆈    😈* \n\n\n' //Main Title 
);





// let sections = [{ title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }];
//         let list = new List('List body', 'btnText', sections, 'Title', 'footer');