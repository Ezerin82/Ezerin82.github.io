let wszystkieWydarzenia = [];
let wybranaEra = null;

fetch('czasy.json')
  .then(res => {
    if (!res.ok) throw new Error('Błąd sieci: ' + res.status);
    return res.json();
  })
  .then(data => {
    // Wczytujemy wszystkie wydarzenia do jednej tablicy
    for (let era in data.czas) {
      for (let rok in data.czas[era]) {
        data.czas[era][rok].forEach(item => {
          wszystkieWydarzenia.push({
            era,
            rok: Number(rok),
            nazwa: item.wydarzenie,
            opis: item.opis,
          });
        });
      }
    }

    // Sortujemy wydarzenia - specjalnie dla E1 lata malejąco, reszta rosnąco
    wszystkieWydarzenia.sort((a, b) => {
      const aVal = a.era === 'E1' ? -a.rok : a.rok;
      const bVal = b.era === 'E1' ? -b.rok : b.rok;
      return aVal - bVal;
    });

    // Dodajemy kliknięcia na ery
    document.querySelectorAll('.era').forEach(el => {
      el.addEventListener('click', () => {
        wybranaEra = el.dataset.era;

        // Ustawiamy aktywną klasę
        document.querySelectorAll('.era').forEach(e => e.classList.remove('active'));
        el.classList.add('active');

        pokazLata(wybranaEra);
        document.getElementById('wydarzenia-content').innerHTML = '<p>Wybierz rok po lewej, aby zobaczyć wydarzenia.</p>';
      });
    });

    // Domyślnie klikamy w pierwszą erę
    const pierwszaEra = document.querySelector('.era');
    if (pierwszaEra) pierwszaEra.click();
  })
  .catch(err => {
    console.error('Błąd:', err);
  });

function pokazLata(era) {
  const ul = document.getElementById('ul-lata');
  ul.innerHTML = '';

  // Zbieramy unikalne lata danej ery i sortujemy
  const lataSet = new Set(wszystkieWydarzenia.filter(e => e.era === era).map(e => e.rok));
  const lata = Array.from(lataSet).sort((a, b) => (era === 'E1' ? b - a : a - b));

  lata.forEach(rok => {
    const li = document.createElement('li');
    li.className = 'rok';
    li.textContent = rok + 'r.';
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      pokazWydarzenia(era, rok);

      // Podświetlamy wybrany rok
      ul.querySelectorAll('li').forEach(e => e.classList.remove('selected'));
      li.classList.add('selected');
    });

    ul.appendChild(li);
  });
}

function pokazWydarzenia(era, rok) {
  const container = document.getElementById('wydarzenia-content');
  container.innerHTML = '';

  const wydarzenia = wszystkieWydarzenia.filter(e => e.era === era && e.rok === rok);

  if (wydarzenia.length === 0) {
    container.innerHTML = '<p>Brak wydarzeń dla tego roku.</p>';
    return;
  }

  wydarzenia.forEach(w => {
    const div = document.createElement('div');
    div.className = 'wydarzenie';

    const tytul = document.createElement('h3');
    tytul.textContent = w.nazwa;

    const opis = document.createElement('p');
    opis.textContent = w.opis;
    opis.style.marginBottom = "2.5%";

    div.appendChild(tytul);
    div.appendChild(opis);

    container.appendChild(div);
  });
}
