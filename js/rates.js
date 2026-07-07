// currencies list
const SHOW_CURRENCIES = ['INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'AED']


const API_URL = 'https://open.er-api.com/v6/latest/USD'

// skeleton dikhane ka function
function showSkeleton(grid) {
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

// cards banane ka function
function showCards(grid, ratesArray) {
    grid.innerHTML = ''
    ratesArray.forEach(function(item) {
        let card = document.createElement('div')
        card.className = 'rate-card'
        card.innerHTML = `
            <div class="rate-card__currency">${item.name}</div>
            <div class="rate-card__rate">${item.rate.toFixed(2)}</div>
            <div class="rate-card__label">per 1 USD</div>
        `
        grid.appendChild(card)
    })
}

// main function h
async function getRates() {

    let grid = document.getElementById('rates-grid')
    let errorBox = document.getElementById('rates-error')

    // skeleton pehle show
    showSkeleton(grid)

    // timeout ke liye AbortController
    let controller = new AbortController()
    let timer = setTimeout(function() {
        controller.abort()
    }, 5000)

    try {
        // API se data fetch kiye
        let response = await fetch(API_URL, {
            signal: controller.signal
        })

        clearTimeout(timer)

        if (!response.ok) {
            throw new Error('response theek nahi aaya')
        }

        let data = await response.json()

        // Web Worker 
        let worker = new Worker('js/worker.js')

        // worker ko raw rates data bheje
        worker.postMessage(data.rates)

        // worker se processed data aane par
        worker.onmessage = function(event) {
            // cards 
            showCards(grid, event.data)

            // worker ka kaam khatam 
            worker.terminate()
        }

        // worker mein error aaye toh
        worker.onerror = function(err) {
            console.log('worker error:', err)
            worker.terminate()
        }

    } catch (error) {

        grid.innerHTML = ''

        if (error.name === 'AbortError') {
            errorBox.innerHTML = '<p>⚠️ Request timeout — 5 sec mein jawab nahi aaya</p>'
        } else {
            errorBox.innerHTML = '<p>⚠️ Service Unavailable. Please try again later.</p>'
        }

        errorBox.removeAttribute('hidden')
        console.log('error aaya:', error)
    }
}

getRates()