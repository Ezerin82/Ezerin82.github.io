fetch('przedmioty.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Błąd sieci: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const przedmioty = data.Przedmioty;

    // 1. Sortuj alfabetycznie po nazwie
    przedmioty.sort((a, b) => {
      const nazwaA = a.Nazwa.toLowerCase();
      const nazwaB = b.Nazwa.toLowerCase();
      return nazwaA.localeCompare(nazwaB);
    });

    // 2. Znajdź listę w HTML
    const listaHTML = document.getElementById("lista-przedmiotow");

    // 3. Dodaj każdy element do listy
    przedmioty.forEach(przedmiot => {
      const nazwa = przedmiot.Nazwa;

      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = nazwa;
      link.href = `wikineo.html?typ=przedmiot&nazwa=${encodeURIComponent(nazwa)}`;

      li.appendChild(link);
      listaHTML.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Błąd:', error);
  });
