document.getElementById('generateForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = await getData()
    const old = document.getElementById('old').value.trim()
    const bookKey = findBook(old, data)
    if(bookKey==undefined){
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
})
async function add(е) {
    е.preventDefault()
    const old = document.getElementById('old').value
    const title = document.getElementById('newTitle').value
    const author = document.getElementById('newAuthor').value
    const description = document.getElementById('newDescripion').value
    const publisher = document.getElementById('newPublisher').value
    const yearOfPublishing = document.getElementById('newYear').value
    const img = document.getElementById('newImg').value
    const genre = document.getElementById('newGenre').value
    const book = { name: title, author, description, publisher, year: yearOfPublishing, img, genre }
    if(title==''||author==''||description==''||publisher==''||yearOfPublishing==''||genre==''){
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
}
async function getData() {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    return data
}
function findBook(old='', data={}) {
    for (const key in data) {
        if (data[key].name == old) {
            return key
        }
    }
}
document.querySelectorAll('form')[1].addEventListener('submit', add)