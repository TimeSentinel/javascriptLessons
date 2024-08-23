function resetForm() {
  document.getElementById("searchInput").value = '';
  document.getElementById('result').textContent='';
  document.getElementById('mainBody').innerHTML = '<p>Welcome to The Traveling Sandwich webiste. Enter in your search request in the field above. <br/><br/>Curently accepting search queries for Beaches, Temples, Japan, Australia, and Brazil. </p><br/><hr/>';
}

function searchDestination() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  document.getElementById('mainBody').textContent='';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const country = data.countries.find(item => item.name.toLowerCase() === input);
      const temples = data.temples;
      const beaches = data.beaches;
      switch (input) {
        case 'temple':
        case 'temples':
          for (const temple of temples) {
            resultDiv.innerHTML += `<h2>${temple.name}</h2>`
            resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="pretty destination" class="gallery" >`
            resultDiv.innerHTML += `<p>${temple.description}</p>`
            resultDiv.innerHTML += `<hr/>`
           }
          break;
        case 'beach':
        case 'beaches':
          for (const beach of beaches) {
            resultDiv.innerHTML += `<h2>${beach.name}</h2>`
            resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="pretty destination" class="gallery" >`
            resultDiv.innerHTML += `<p>${beach.description}</p>`
            resultDiv.innerHTML += `<hr/>`
          }
          break;
        default:
          if (country) {
            for (const city of country.cities) {
              resultDiv.innerHTML += `<h2>${city.name}</h2>`
              resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="pretty destination" class="gallery" >`
              resultDiv.innerHTML += `<p>${city.description}</p>`
              resultDiv.innerHTML += `<hr/>`
            }
          } else {
            resultDiv.innerHTML = 'Destination not found.';
            resultDiv.innerHTML += `<hr/>`
          }
      }

    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}



btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', resetForm);

