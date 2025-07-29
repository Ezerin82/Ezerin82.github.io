fetch('postacie.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Błąd sieci: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const postacie = data.Postacie;

    // 1. Sortuj alfabetycznie po imieniu
    postacie.sort((a, b) => {
      const imieA = a.PodstawoweInfo.Imie.toLowerCase();
      const imieB = b.PodstawoweInfo.Imie.toLowerCase();
      return imieA.localeCompare(imieB);
    });

    // 2. Znajdź listę w HTML
    const listaHTML = document.getElementById("lista-postaci");

    // 3. Dodaj każdy element do listy
    postacie.forEach(postac => {
      const imie = postac.PodstawoweInfo.Imie;

      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = imie;
      link.href = `wikineo.html?typ=postac&imie=${encodeURIComponent(imie)}`;

      li.appendChild(link);
      listaHTML.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Błąd:', error);
  });
