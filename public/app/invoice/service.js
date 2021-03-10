import {handleStatus} from '../utils/promise-helpers.js'

const API = 'http://localhost:3000/invoices'

const sumItems = code => invoices => invoices
    .$flatMap(invoice => invoice.items)
    .filter(item => item.code === code)
    .reduce((total, item) => total += item.value, 0)

export const invoiceService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .catch(err => {
                console.log(err)
                return Promise.reject('Error fetching invoices')
            })
    },

    sumItems(code) {
        return this.listAll().then(sumItems(code))
    }
}