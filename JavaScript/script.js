async function searchArtists() {
  const query = document.getElementById('search-bar').value;
  const dropdownMenu = document.getElementById('search-suggestions');

  // Clear results if query is empty
  if (!query.trim()) {
    dropdownMenu.innerHTML = '';
    dropdownMenu.style.display = 'none';
    return;
  }

  try {
    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const results = await response.json();

    // Clear previous suggestions
    dropdownMenu.innerHTML = '';
    dropdownMenu.style.display = 'none';

    if (results.length > 0) {
      results.forEach(result => {
        const listItem = document.createElement('div');
        listItem.classList.add('result-item');
        listItem.textContent = `${result.name} - ${result.type}`;
        listItem.onclick = () => {
          // Redirect the user to the artist's page
          window.location.href = `/artist?id=${result.id}`; // Assuming result.id contains the artist's ID
        };
        dropdownMenu.appendChild(listItem);
      });
      dropdownMenu.style.display = 'block'; // Show the dropdown with results
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    dropdownMenu.innerHTML = '<div class="result-item">No Matches Found</div>';
    dropdownMenu.style.display = 'block';
  }
}

// Hide dropdown if clicked outside
document.addEventListener('click', (event) => {
  const dropdownMenu = document.getElementById('search-suggestions');
  const searchBar = document.getElementById('search-bar');
  if (!searchBar.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});
