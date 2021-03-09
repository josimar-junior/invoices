import {handleStatus, log} from './utils/promise-helpers.js'
import './utils/array-helpers.js'

const sumItems = invoices => 
    invoices.$flatMap(invoice => invoice.items)
    .filter(item => item.code === '2143')
    .reduce((total, item) => total += item.value, 0)

document.getElementById("myButton")
    .onclick = () => 
    fetch('http://localhost:3000/invoices')
    .then(handleStatus)
    .then(sumItems)
    .then(log)
    .catch(console.log)