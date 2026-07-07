

// jab main thread se message aayega
self.onmessage = function(event) {

    // jo data aaya usse pakdo
    let rawData = event.data

    // sirf ye currencies chahiye
    let currencies = ['INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'AED']

    // filter karo aur naya array 
    let result = []

    currencies.forEach(function(currency) {
        result.push({
            name: currency,
            rate: rawData[currency]
        })
    })

    // processed data wapas bhejo main thread ko
    self.postMessage(result)
}