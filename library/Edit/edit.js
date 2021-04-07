document.getElementById('generateForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = await getData()
    const old = document.getElementById('old').value.trim()
    if (old == '') {
        return alert('Old book title is requred!')
    }
    const bookKey = findBook(old, data)
    if (bookKey == undefined) {
        return alert('Book not found!')
    }
    const res = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/' + bookKey + '.json')
    const book = await res.json()
    document.getElementById('newTitle').value = book.name
    document.getElementById('newAuthor').value = book.author
    document.getElementById('newDescripion').value = book.description
    document.getElementById('newPublisher').value = book.publisher
    document.getElementById('newYear').value = book.year
    document.getElementById('newImg').value = book.img
    document.getElementById('newGenre').value = book.genre
    document.getElementById('newPages').value = book.pages
})
async function add(е) {
    е.preventDefault()
    const old = document.getElementById('old').value.trim()
    const title = document.getElementById('newTitle').value.trim()
    const author = document.getElementById('newAuthor').value.trim()
    const description = document.getElementById('newDescripion').value.trim()
    const publisher = document.getElementById('newPublisher').value.trim()
    const yearOfPublishing = document.getElementById('newYear').value.trim()
    const img = document.getElementById('newImg').value.trim()
    const genre = document.getElementById('newGenre').value.trim()
    const pages = document.getElementById('newPages').value.trim()
    const book = { name: title, author, description, publisher, year: yearOfPublishing, img, genre, pages }
    if (title == '' || author == '' || publisher == ''
        || yearOfPublishing == ''
        || genre == ''
        || pages == '') {
        return alert('All book fields are required!')
    }
    const value = await getData()
    const key = findBook(old, value)
    fetch('https://books-76270-default-rtdb.firebaseio.com/books/' + key + '.json', {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    })
    alert('Book successfully edited!')
    document.getElementById('old').value = ''
    document.getElementById('newTitle').value = ''
    document.getElementById('newAuthor').value = ''
    document.getElementById('newDescripion').value = ''
    document.getElementById('newPublisher').value = ''
    document.getElementById('newYear').value = ''
    document.getElementById('newImg').value = ''
    document.getElementById('newGenre').value = ''
    document.getElementById('newPages').value = ''
}
async function getData() {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    return data
}
function findBook(old = '', data = {}) {
    for (const key in data) {
        if (data[key].name == old) {
            return key
        }
    }
}
document.querySelectorAll('form')[1].addEventListener('submit', add)