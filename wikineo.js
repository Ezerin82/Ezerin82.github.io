function drawRadarChart(container, stats) {
    const width = 300;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = 100;
    const levels = 5;
    const angleStep = (2 * Math.PI) / stats.length;

    container.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'poligon');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.width = '100%';
    svg.style.height = 'auto';

    container.appendChild(svg);

    // Podziałki
    for (let level = 1; level <= levels; level++) {
        const r = (maxRadius / levels) * level;
        let points = [];
        for (let i = 0; i < stats.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            points.push(`${x},${y}`);
        }
        const polygon = document.createElementNS(svgNS, 'polygon');
        polygon.setAttribute('points', points.join(' '));
        polygon.setAttribute('stroke', '#666');
        polygon.setAttribute('stroke-width', '1');
        polygon.setAttribute('fill', 'none');
        svg.appendChild(polygon);
    }

    // Osie i etykiety
    stats.forEach((stat, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + maxRadius * Math.cos(angle);
        const y = centerY + maxRadius * Math.sin(angle);

        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#999');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);

        const label = document.createElementNS(svgNS, 'text');
        label.textContent = stat.name;
        const offset = 22;
        label.setAttribute('x', x + offset * Math.cos(angle));
        label.setAttribute('y', y + offset * Math.sin(angle));
        label.setAttribute('font-size', '18');
        label.setAttribute('fill', '#eee');
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        svg.appendChild(label);
    });

    // Wielokąt z wartościami
    let points = [];
    stats.forEach((stat, i) => {
        const val = stat.value;
        const radius = (val / 10) * maxRadius;
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push(`${x},${y}`);

        const circle = document.createElementNS(svgNS, 'circle');

        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 4);
        circle.setAttribute('fill', '#e4b113');
        svg.appendChild(circle);
    });

    const dataPolygon = document.createElementNS(svgNS, 'polygon');

    dataPolygon.setAttribute('points', points.join(' '));
    dataPolygon.setAttribute('fill', 'rgba(228, 177, 19, 0.5)');
    dataPolygon.setAttribute('stroke', '#e4b113');
    dataPolygon.setAttribute('stroke-width', '2');
    svg.appendChild(dataPolygon);
}

function PobierzInfo() {
    let params = new URLSearchParams(window.location.search);
    let typ = params.get('typ');

    switch (typ) {
        case 'postac':
            document.querySelector('#postac').style.display = `flex`;
            const imie = params.get('imie');

            console.log('Kliknięto postać:', imie);

            fetch('dane.json')
                .then((res) => res.json())
                .then((data) => {
                    const postacie = data.Postacie;
                    const postac = postacie.find((p) => p.PodstawoweInfo.Imie === imie);

                    if (postac) {
                        console.log('Dane postaci:', postac);
                        document.querySelector('#PO-header p').innerHTML += postac.PodstawoweInfo.Imie;

                        document.querySelector('#PelnaNazwa').innerHTML += postac.PodstawoweInfo.PelnaNazwa;
                        document.querySelector('#Pseudonimy').innerHTML += postac.PodstawoweInfo.Pseudonimy.map((el, i) => (i === 0 ? el : ' ' + el)).join(', ');
                        document.querySelector('#Plec').innerHTML += postac.PodstawoweInfo.Plec;
                        document.querySelector('#Wiek').innerHTML += postac.PodstawoweInfo.Wiek;
                        document.querySelector('#Rasa').innerHTML += postac.PodstawoweInfo.Rasa;
                        document.querySelector('#Klasa').innerHTML += postac.PodstawoweInfo.Klasa.map((el, i) => (i === 0 ? el : ' ' + el)).join(', ');
                        document.querySelector('#Fakcje').innerHTML += postac.PodstawoweInfo.Fakcje.map((el, i) => (i === 0 ? el : ' ' + el)).join(', ');
                        document.querySelector('#Ranga').innerHTML += postac.PodstawoweInfo.Ranga;
                        document.querySelector('#Narodowosc').innerHTML += postac.PodstawoweInfo.Narodowosc;
                        document.querySelector('#Wiara').innerHTML += postac.PodstawoweInfo.Wiara;
                        document.querySelector('#MiejsceUrodzenia').innerHTML += postac.PodstawoweInfo.MiejsceUrodzenia;
                        document.querySelector('#DataUrodzenia').innerHTML += postac.PodstawoweInfo.DataUrodzenia;
                        document.querySelector('#MiejsceSmierci').innerHTML += postac.PodstawoweInfo.MiejsceSmierci;
                        document.querySelector('#DataSmierci').innerHTML += postac.PodstawoweInfo.DataSmierci;

                        // ------------------- InfoOCiele -------------------
                        document.querySelector('#Wzrost').innerHTML += postac.InfoOCiele.Wzrost + 'm';
                        document.querySelector('#Waga').innerHTML += postac.InfoOCiele.Waga + 'kg';
                        document.querySelector('#KolorSkory').innerHTML += postac.InfoOCiele.KolorSkory;
                        document.querySelector('#RodzajWlosow').innerHTML += postac.InfoOCiele.RodzajWlosow;
                        document.querySelector('#KolorWlosow').innerHTML += postac.InfoOCiele.KolorWlosow;
                        document.querySelector('#KolorOczu').innerHTML += postac.InfoOCiele.KolorOczu;
                        document.querySelector('#Blizny').innerHTML += postac.InfoOCiele.Blizny;
                        document.querySelector('#CechySzczegolne').innerHTML += postac.InfoOCiele.CechySzczegolne;
                        document.querySelector('#Historia').innerHTML += postac.Historia;

                        const stats = [
                            { name: 'Siła', value: postac.InfoOCiele.Sila },
                            { name: 'Zwinność', value: postac.InfoOCiele.Zwinnosc },
                            { name: 'Kondycja', value: postac.InfoOCiele.Kondycja },
                            { name: 'Zdrowie', value: postac.InfoOCiele.Zdrowie },
                            { name: 'Uroda', value: postac.InfoOCiele.Uroda },
                            { name: 'Energia', value: postac.InfoOCiele.Energia },
                        ];

                        const radarContainer = document.getElementById('stats-container');
                        drawRadarChart(radarContainer, stats);
                    } else {
                        console.warn('Nie znaleziono postaci o imieniu:', imie);
                    }
                });

            break;

        default:
            console.log('niedziala');
    }
}

PobierzInfo();
