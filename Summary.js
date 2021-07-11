function flatten(into, node) {
    if (node == null) return into;
    if (Array.isArray(node)) return node.reduce(flatten, into);
    into.push(node);
    return flatten(into, node.children);
}

function Summary() {

    const app = document.getElementById('summary')
    app.innerHTML = "";
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)

    let request = new XMLHttpRequest()
    request.open('GET', 'https://restcountries.eu/rest/v2/all', true)
    request.onload = function () {

        let data = JSON.parse(this.response)
        // podpunkt B,C
        let data_lang_flatten = data.map(data => data.languages);
        let data_curr_flatten = data.map(data => data.currencies);
        data_lang_flatten = flatten([], data_lang_flatten)
        data_curr_flatten = flatten([], data_curr_flatten)
        let arr_lang = data_lang_flatten.map(data => data.name);
        let arr_curr = data_curr_flatten.map(data => data.code);
        let borders = data.map(data => data.borders.length)
        console.log(borders)

        topLang = {};
        topCurr = {}
        for (let i = 0; i < arr_lang.length; ++i) {
            if (!topLang[arr_lang[i]])
                topLang[arr_lang[i]] = 0;
            ++topLang[arr_lang[i]];
        }
        for (let i = 0; i < arr_curr.length; ++i) {
            if (!topCurr[arr_curr[i]])
                topCurr[arr_curr[i]] = 0;
            ++topCurr[arr_curr[i]];
        }

        langSorted = Object.keys(topLang).sort(function (a, b) { return topLang[a] - topLang[b] })
        currSorted = Object.keys(topCurr).sort(function (a, b) { return topCurr[a] - topCurr[b] })
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        const countiresAll = document.createElement('p')
        const languages = document.createElement('p')
        const currencies = document.createElement('p')
        const avgPopulation = document.createElement('p')
        const avgArea = document.createElement('p')
        const neighboursNumber = document.createElement('p')
        // podpunkt D
        let populationNumber = data.reduce(function (prev, cur) {
            return prev + cur.population;
        }, 0);
        // E
        let area = data.reduce(function (prev, cur) {
            return prev + cur.area;
        }, 0);

        // F 
        let neighbours = borders.reduce((a, b) => a + b, 0)

        // podpunkt A
        countiresAll.textContent = `Ilość wszystkich krajów  -> ${Object.keys(data).length}`
        // dodanie reszty podpunktów
        languages.textContent = `Top 5 języków na świecie  -> ${langSorted[111]}, ${langSorted[110]}, ${langSorted[109]}, ${langSorted[108]}, ${langSorted[107]}`
        currencies.textContent = `Top 5 walut -> ${currSorted[161]}, ${currSorted[160]}, ${currSorted[159]}, ${currSorted[157]}, ${currSorted[156]}`
        avgPopulation.textContent = `Srednia populacja -> ${Math.floor(populationNumber / Object.keys(data).length)}`
        avgArea.textContent = `Średni obszar -> ${Math.floor(area / Object.keys(data).length)} [metry kwadratowe] `
        neighboursNumber.textContent = `Srednia ilość sąsiadów -> ${Math.floor(neighbours / Object.keys(data).length)} `
        container.appendChild(card)

        card.appendChild(countiresAll)
        card.appendChild(languages)
        card.appendChild(currencies)
        card.appendChild(avgPopulation)
        card.appendChild(avgArea)
        card.appendChild(neighboursNumber)

    }

    request.send()
}
