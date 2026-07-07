


// ye 8 currencies show karni hain
const SHOW_CURRENCIES = ['INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'AED']

// API ka address
const API_URL = 'https://open.er-api.com/v6/latest/USD'

// skeleton cards banane ka function
function showSkeleton(grid) {
    // 8 currency hain to 8 skeleton cards 
    for (let i = 0; i < 8; i++) {
        let skeleton = document.createElement('div')
        skeleton.className = 'rate-card rate-card--skeleton'
        skeleton.innerHTML = `
            <div class="skeleton-box skeleton-box--sm"></div>
            <div class="skeleton-box skeleton-box--lg"></div>
            <div class="skeleton-box skeleton-box--sm"></div>
        `
        grid.appendChild(skeleton)
    }
}

// rates fetch karne ka main function
async function getRates() {

    // HTML elements pakdo
    let grid = document.getElementById('rates-grid')
    let errorBox = document.getElementById('rates-error')

    // pehle skeleton dikhao
    showSkeleton(grid)

    // AbortController — 5 sec ka timeout
    let controller = new AbortController()
    let timer = setTimeout(function() {
        controller.abort()
    }, 5000)

    try {
        // fetch karo — controller signal bhi do
        let response = await fetch(API_URL, {
            signal: controller.signal
        })

        // timer band karo kyunki data aa gaya
        clearTimeout(timer)

        // response theek nahi aaya
        if (!response.ok) {
            throw new Error('response theek nahi aaya')
        }

        // JSON mein convert 
        let data = await response.json()

        // skeleton hatao
        grid.innerHTML = ''

        // real cards banao
        SHOW_CURRENCIES.forEach(function(currency) {

            let rate = data.rates[currency]

            let card = document.createElement('div')
            card.className = 'rate-card'

            card.innerHTML = `
                <div class="rate-card__currency">${currency}</div>
                <div class="rate-card__rate">${rate.toFixed(2)}</div>
                <div class="rate-card__label">per 1 USD</div>
            `

            grid.appendChild(card)
        })

    } catch (error) {

        // skeleton hatao
        grid.innerHTML = ''

        // timeout hua ya kuch aur
        if (error.name === 'AbortError') {
            errorBox.innerHTML = '<p>Request timeout — server ne 5 sec mein jawab nahi diya</p>'
        } else {
            errorBox.innerHTML = '<p> Service Unavailable. Please try again later.</p>'
        }

        errorBox.removeAttribute('hidden')
        console.log('error aaya:', error)
    }
}

// page load hone par
getRates()