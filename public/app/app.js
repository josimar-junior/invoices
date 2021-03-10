import {log} from './utils/promise-helpers.js'
import './utils/array-helpers.js'
import {invoiceService} from './invoice/service.js'

document.getElementById("myButton")
    .onclick = () => 
    invoiceService
    .sumItems('2143')
    .then(log)
    .catch(log)