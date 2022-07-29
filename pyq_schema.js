const { List } = require('whatsapp-web.js')

module.exports = new List(
    'Every  will be ' //2nd Title
    ,

    'Click ME' //Button text
    ,

    [{
        title: 'sectionTitle' //List Heading
            ,
        rows: [
            { title: 'ListItem1', description: 'desc' }, //1st List Item 
            { title: 'ListItem2' } //2nd List Item
        ]
    }],

    //innerBodyEnd
    '3RD Year UnderGround Association Welcomes You' //Main Title 
);




// let sections = [{ title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }];
//         let list = new List('List body', 'btnText', sections, 'Title', 'footer');