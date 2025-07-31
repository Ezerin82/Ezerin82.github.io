let wszystkieWydarzenia = [];
let wybranaEra = null;

fetch('czasy.json')
    .then((res) => {
        if (!res.ok) throw new Error('Błąd sieci: ' + res.status);
        return res.json();
    })
    .then((data) => {
        for (let era in data.czas) {
            const entries = data.czas[era];

            entries.forEach((entry) => {
                const rok = Object.keys(entry)[0];
                const wydarzenia = entry[rok];

                wydarzenia.forEach((item) => {
                    wszystkieWydarzenia.push({
                        era,
                        rok: Number(rok),
                        nazwa: item.wydarzenie,
                        opis: item.opis,
                    });
                });
            });
        }

        wszystkieWydarzenia.sort((a, b) => {
            if (a.rok !== b.rok) return a.rok - b.rok;
            return a.nazwa.localeCompare(b.nazwa);
        });

        document.querySelectorAll('.era').forEach((el) => {
            el.addEventListener('click', () => {
                wybranaEra = el.dataset.era;

                document.querySelectorAll('.era').forEach((e) => e.classList.remove('active'));
                el.classList.add('active');

                pokazLata(wybranaEra);
                document.getElementById('wydarzenia-content').innerHTML = '<p>Wybierz rok po lewej, aby zobaczyć wydarzenia.</p>';
            });
        });

        const pierwszaEra = document.querySelector('.era');
        if (pierwszaEra) pierwszaEra.click();
    })
    .catch((err) => {
        console.error('Błąd:', err);
    });

function pokazLata(era) {
    const ul = document.getElementById('ul-lata');
    ul.innerHTML = '';

    const lataSet = new Set(wszystkieWydarzenia.filter((e) => e.era === era).map((e) => e.rok));
    const lata = Array.from(lataSet).sort((a, b) => a - b);

    lata.forEach((rok) => {
        const li = document.createElement('li');
        li.className = 'rok';
        li.textContent = rok + 'r.';
        li.style.cursor = 'pointer';

        li.addEventListener('click', () => {
            pokazWydarzenia(era, rok);

            ul.querySelectorAll('li').forEach((e) => e.classList.remove('selected'));
            li.classList.add('selected');
        });

        ul.appendChild(li);
    });
}

function pokazWydarzenia(era, rok) {
    const container = document.getElementById('wydarzenia-content');
    container.innerHTML = '';

    const wydarzenia = wszystkieWydarzenia.filter((e) => e.era === era && e.rok === rok);

    if (wydarzenia.length === 0) {
        container.innerHTML = '<p>Brak wydarzeń dla tego roku.</p>';
        return;
    }

    wydarzenia.forEach((w) => {
        const div = document.createElement('div');
        div.className = 'wydarzenie';

        const tytul = document.createElement('h3');
        tytul.textContent = w.nazwa;

        const opis = document.createElement('p');
        opis.textContent = w.opis;
        opis.style.marginBottom = '2.5%';

        div.appendChild(tytul);
        div.appendChild(opis);

        container.appendChild(div);
    });
}
