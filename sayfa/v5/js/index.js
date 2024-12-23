import { DOMElements } from 'https://rchesapla.github.io/sayfa/v5/js/modules/DOMElements.js'
import { Calculator } from 'https://rchesapla.github.io/sayfa/v5/js/modules/calculator/index.js'

const app = new Calculator({
    page: document.body.id,
    DOMElements
})

app.init()