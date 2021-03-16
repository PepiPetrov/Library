async function add(e) {
    e.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const description = document.getElementById('description').value
    const publisher = document.getElementById('publisher').value
    const yearOfPublishing = document.getElementById('year').value
    const img = document.getElementById('img').value
    const genre = document.getElementById('genre').value
    const book = { name: title, author, description, publisher, year: yearOfPublishing, img, genre }
    if(title==''||author==''||description==''||publisher==''||yearOfPublishing==''||genre==''){
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
    alert('Book successfully added!')
}

document.querySelector('form').addEventListener('submit', add)