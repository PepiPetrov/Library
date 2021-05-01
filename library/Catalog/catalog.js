async function addToMain() {
    const ul = document.querySelector('main')
    ul.innerHTML = 'Loading&hellip;'
    const books = await getData()
    if (books == null) {
        ul.innerHTML = 'Catalog is empty. But you can <a href="../Add/add.html">Add your first book</a>'
        return
    }
    const values = Object.values(books)
    values.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
    ul.innerHTML = `${values.length} book${values.length > 1 ? 's' : ''}<br><br>`
    values.forEach(x => {
        const a = document.createElement('a')
        a.innerText = x.name
        a.href = 'file:///D:/Users/Windows/Desktop/library/Details/details.html?title=' + x.name
        ul.appendChild(a)
        ul.appendChild(document.createElement('br'))
    })
}
async function getData() {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    return data
}
addToMain()