

// const cds = require('@sap/cds');

// class CatalogService extends cds.ApplicationService {
//     init() {
//         const { Books } = cds.entities('CatalogService');
//         //const {  } =this.entities;

//         this.after('each', Books, book => {
//             //if (book.stock > 111) { 
//             book.title += ` -- 11% discount!`
//             //} 
//         })
//         return super.init()
//     }
// }
// module.exports = CatalogService


const cds = require('@sap/cds');
class CatalogService extends cds.ApplicationService {
    async init() {
        const db = await cds.connect.to('db');
        //const srv =await cds.connect.to('CatalogService');
        const { Books } = db.entities
        this.after('each', 'Books', book => {
            if (book.stock > 111) book.title += ` -- 11% discount!`
        });
        this.on('submitOrder', async req => {
            const { book, quantity } = req.data
            const n = await UPDATE(Books, book)
                .with({ stock: { '-=': quantity } })
                .where({ stock: { '>=': quantity } })
            //n > 0 || req.error(409, `${quantity} exceeds stock for book #${book}`)
            await this.send('bhargav');
        });
        this.on('bhargav', async req => {
            console.log("0");
            // await this.send('submitOrder', {
            //     "book": "201",
            //     "quantity": 2
            // });
        })

        return super.init()
    }

}
module.exports = CatalogService

//module.exports = function (){
//     this.on ('submitOrder', (req)=>{...}) //> custom actions
//     this.on ('CREATE',`Books`, (req)=>{...})
//     this.before ('UPDATE',`*`, (req)=>{...})
//     this.after ('READ',`Books`, (books)=>{...})
//   }