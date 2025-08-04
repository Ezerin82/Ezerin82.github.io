fetch('panstwa.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Błąd sieci: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const panstwa = data.Panstwa;

    // 1. Sortowanie alfabetyczne po nazwie kraju
    panstwa.sort((a, b) => {
      const nazwaA = a.Nazwa.toLowerCase();
      const nazwaB = b.Nazwa.toLowerCase();
      return nazwaA.localeCompare(nazwaB);
    });

    // 2. Znajdź listę w HTML
    const listaHTML = document.getElementById("lista-panstw");

    // 3. Dodaj każdy element do listy
    panstwa.forEach(panstwo => {
      const nazwa = panstwo.Nazwa;

      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = nazwa;
      link.href = `wikineo.html?typ=panstwo&nazwa=${encodeURIComponent(nazwa)}`;

      li.appendChild(link);
      listaHTML.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Blad:', error);
  });
