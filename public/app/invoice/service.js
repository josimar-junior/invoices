import {handleStatus} from '../utils/promise-helpers.js'
import {partialize, pipe} from '../utils/operators.js'

const API = 'http://localhost:3000/invoices'

const getItemsFromInvoices = invoices =>
    invoices.$flatMap(invoice => invoice.items)

const filterItemsByCode = (code, items) => 
    items.filter(item => item.code === code)

const sumItemsValue = items => 
    items.reduce((total, item) => total += item.value, 0)

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
        const sumItems = pipe(
            getItemsFromInvoices,
            partialize(filterItemsByCode, code),
            sumItemsValue
        )
        return this.listAll().then(sumItems)
    }
}