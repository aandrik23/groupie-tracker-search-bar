async function searchArtists() {
  const query = document.getElementById('search-bar').value;
  const dropdownMenu = document.getElementById('search-suggestions');

  if (!query.trim()) {
      dropdownMenu.innerHTML = '';
      dropdownMenu.style.display = 'none';
      return;
  }

  try {
      const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
      const results = await response.json();

      dropdownMenu.innerHTML = '';
      dropdownMenu.style.display = 'none';

      if (results.length > 0) {
          results.forEach(result => {
              const listItem = document.createElement('div');
              listItem.classList.add('result-item');
              listItem.textContent = result.name;
              listItem.onclick = () => {
                  window.location.href = `/artist?id=${result.id}`;
              };
              dropdownMenu.appendChild(listItem);
          });
          dropdownMenu.style.display = 'block';
      }
  } catch (error) {
      console.error('Error fetching search results:', error);
      dropdownMenu.innerHTML = '<div class="result-item">No Matches Found</div>';
      dropdownMenu.style.display = 'block';
  }
}

// Event listener for "Filter Cards" button
document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById('search-bar');

  // Filter artist cards as user types
  searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
      const artistCards = document.querySelectorAll('.artist-card');

      artistCards.forEach(card => {
          const artistName = card.querySelector('h2').textContent.toLowerCase();
          card.style.display = artistName.includes(query) ? 'block' : 'none';
      });
  });
});

// Hide dropdown if clicked outside
document.addEventListener('click', (event) => {
  const dropdownMenu = document.getElementById('search-suggestions');
  const searchBar = document.getElementById('search-bar');
  if (!searchBar.contains(event.target)) {
      dropdownMenu.style.display = 'none';
  }
});