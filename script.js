// وظيفة للبحث
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', function () {
  const query = searchInput.value.trim();
  if (query) {
    alert(`You searched for: ${query}`);
  } else {
    alert('Please enter a search term!');
  }
});