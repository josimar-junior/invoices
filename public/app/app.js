import './utils/array-helpers.js'
import {log, timeoutPromise, retry} from './utils/promise-helpers.js'
import {invoiceService} from './invoice/service.js'
import {takeUntil, debounceTime, partialize, pipe} from "./utils/operators.js"
import {EventEmmiter} from './utils/event-emmiter.js'

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
)

const action = operations(() => 
    retry(5, 3000, () => timeoutPromise(200, invoiceService.sumItems('2143')))
    .then(total => EventEmmiter.emit('totaledItems', total))
    .catch(log)
)

document.getElementById("myButton")
    .onclick = action; 
    