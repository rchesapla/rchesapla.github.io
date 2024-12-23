import { DOMElements } from "https://lmendev.github.io/rollercoin-calculator/js/modules/DOMElements.js"
import { Calculator } from "https://lmendev.github.io/rollercoin-calculator/js/modules/calculator/index.js"

const app = new Calculator({
    page: document.body.id,
    DOMElements
})

app.init()