function displayAll() {

    const app = document.getElementById('root')
    app.innerHTML = "";
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)

    let request = new XMLHttpRequest()
    request.open('GET', 'https://restcountries.eu/rest/v2/all', true)
    request.onload = function () {

        let data = JSON.parse(this.response)
        console.log()
        if (request.status >= 200 && request.status < 400) {
            data.forEach((country) => {
                const card = document.createElement('div')
                card.setAttribute('class', 'card')
                const h1 = document.createElement('h2')
                h1.textContent = country.name
                const p = document.createElement('p')
                const p2 = document.createElement('p')
                const p3 = document.createElement('p')
                const p4 = document.createElement('p')
                const img = document.createElement('img')
                img.setAttribute('height', '25px');
                img.setAttribute('width', '55px');

                p.textContent = `Waluta -> ${country.currencies.map(({ code }) => code).join(', ')}`
                p2.textContent = `Język -> ${country.languages.map(({ name }) => name).join(', ')}`
                p3.textContent = `Ludność -> ${country.population}`
                p4.textContent = `Powierzchnia -> ${country.area} metrów kwadratowych`
                img.src = country.flag

                container.appendChild(card)
                card.appendChild(h1)
                card.appendChild(p)
                card.appendChild(p2)
                card.appendChild(p3)
                card.appendChild(p4)
                card.appendChild(img)

            })
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Nie dziala! `
            app.appendChild(errorMessage)
        }
    }

    request.send()
}