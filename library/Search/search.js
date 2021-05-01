async function addToMain(e) {
    e.preventDefault()

    const keyword = document.getElementById('c').value.toLocaleLowerCase().trim()
    if (keyword == '') {
        return alert('Keyword is required!')
    }

    const ul = document.querySelector('main')
    ul.innerHTML = 'Searching&hellip;'
    const books = await getData()

    if (books == null) {
        return ul.innerHTML = 'No books - Catalog is empty! <a href="../Add/add.html">Add your first book</a>'
    }

    const criteria = document.getElementById('cr').value
    const values = Object.values(books)
    let filtered = [];

    if (criteria == 'Заглавие') {
        filtered = values.filter(x => x.name.toLocaleLowerCase().startsWith(keyword))
    } else if (criteria == 'Автор') {
        filtered = values.filter(x => x.author.toLocaleLowerCase().startsWith(keyword))
    } else if (criteria == 'Издател') {
        filtered = values.filter(x => x.publisher.toLocaleLowerCase().startsWith(keyword))
    } else if (criteria == 'Жанр') {
        filtered = values.filter(x => x.genre.toLocaleLowerCase().startsWith(keyword))
    } else if (criteria == 'Година на издаване') {
        filtered = values.filter(x => x.year.toLocaleLowerCase().startsWith(keyword))
    }

    if (filtered.length == 0) {
        ul.textContent = 'No books found'
        return
    }

    filtered.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
    view(filtered, ul)
    document.getElementById('c').value = ''

}
async function getData() {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    return data
}
document.querySelector('form').addEventListener('submit', addToMain)

function view(filtered = [], ul) {
    ul.innerHTML = `${filtered.length} book${filtered.length > 1 ? 's' : ''} found<br><br>`
    filtered.forEach(x => {
        const a = document.createElement('a')
        a.innerText = x.name
        a.href = 'file:///D:/Users/Windows/Desktop/library/Details/details.html?title=' + x.name
        ul.appendChild(a)
        ul.appendChild(document.createElement('br'))
    })
}