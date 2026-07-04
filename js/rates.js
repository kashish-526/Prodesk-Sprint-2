// jin currencies ki rates dikhani hain
const SHOW_CURRENCIES = ['INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'AED']

// API ka address
const API_URL = 'https://open.er-api.com/v6/latest/USD'

// rates fetch karne ka function
async function getRates() {

    // grid aur error elements pakdo
    let grid = document.getElementById('rates-grid')
    let errorBox = document.getElementById('rates-error')

    try {
        // API se data mangna
        let response = await fetch(API_URL)

        // agar response theek nahi toh ye
        if (!response.ok) {
            throw new Error('API ne galat response diya')
        }

        // JSON data nikale
        let data = await response.json()

        // sirf wahi currencies lo jo SHOW_CURRENCIES mein hain
SHOW_CURRENCIES.forEach(function(currency) {
    // us currency ki rate nikalo
    let rate = data.rates[currency]

    // ek card div banao
    let card = document.createElement('div')
    card.className = 'rate-card'

    // card ke andar content daalo
    card.innerHTML = `
        <div class="rate-card__currency">${currency}</div>
        <div class="rate-card__rate">${rate.toFixed(2)}</div>
        <div class="rate-card__label">per 1 USD</div>
    `

    // card ko grid mein daalo
    grid.appendChild(card)
})
        

    } catch (error) {
        // kuch bhi gadbad hua to error box show
        errorBox.removeAttribute('hidden')
        console.log('Error aaya:', error)
    }
}

// jab page load ho tab chalao
getRates()