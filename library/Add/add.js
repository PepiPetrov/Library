async function add(e) {
    e.preventDefault()
    const title = document.getElementById('title').value.trim()
    const author = document.getElementById('author').value.trim()
    let description = document.getElementById('description').value.trim()
    const publisher = document.getElementById('publisher').value.trim()
    const yearOfPublishing = document.getElementById('year').value.trim()
    const img = document.getElementById('img').value.trim()
    const genre = document.getElementById('genre').value.trim()
    const pages = document.getElementById('pages').value.trim()
    const book = { name: title, author, description, publisher, year: yearOfPublishing, img, genre, pages }
    if (title == '' || author == '' || publisher == ''
        || yearOfPublishing == '' ||
        genre == '' ||
        pages == '') {
        return alert('All book fields are required!')
    }
    fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(book)
    })
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('description').value = ''
    document.getElementById('publisher').value = ''
    document.getElementById('year').value = ''
    document.getElementById('img').value = ''
    document.getElementById('genre').value = ''
    document.getElementById('pages').value = ''
    alert('Book successfully added!')
}

document.querySelector('form').addEventListener('submit', add)