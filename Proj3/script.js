const ROLL_NUMBER = "27100020";
const BASE_URL = "https://assignment3.rohanhussain.com/api/books/" + ROLL_NUMBER;

document.addEventListener("DOMContentLoaded", () => {
  // CATALOG PAGE
  const bookForm = document.getElementById("bookForm");
  const bookList = document.getElementById("book-list");

  if (bookForm) {
    fetchBooks();

    bookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const coverImageUrl = document.getElementById("coverImageUrl").value.trim();
      const price = parseFloat(document.getElementById("price").value);

      if (!title || !author || !coverImageUrl || isNaN(price)) return alert("Fill all fields properly.");

      await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, coverImageUrl, price }),
      });

      bookForm.reset();
      fetchBooks();
    });
  }

  async function fetchBooks() {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    renderBooks(data.result.books, bookList);
  }

  // SEARCH PAGE
  const searchBtn = document.getElementById("searchBtn");
  const searchResults = document.getElementById("search-results");

  if (searchBtn) {
    searchBtn.addEventListener("click", async () => {
      const query = document.getElementById("searchQuery").value.trim();
      if (!query) return;

      const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      renderBooks(data.result.books, searchResults);
    });
  }

  function renderBooks(books, container) {
    container.innerHTML = "";
    if (!books || books.length === 0) {
      container.innerHTML = "<p>No books found.</p>";
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <img src="${book.coverImageUrl}" alt="${book.title}" />
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Price:</strong> PKR ${book.price}</p>
      `;
      container.appendChild(card);
    });
  }
});
