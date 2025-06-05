

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
        const { Books } = db.entities
        this.after('each', 'Books', book => {
            if (book.stock > 111) book.title += ` -- 11% discount!`
        });
        this.on('submitOrder', async req => {
            const { book, quantity } = req.data
            const n = await UPDATE(Books, book)
                .with({ stock: { '-=': quantity } })
                .where({ stock: { '>=': quantity } })
            n > 0 || req.error(409, `${quantity} exceeds stock for book #${book}`)
        })

        return super.init()
    }

}
module.exports = CatalogService