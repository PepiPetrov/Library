async function add() {
    const old = decodeURIComponent(window.location.search.split('=')[1])
    const value = await getData()
    const key = findBook(old, value)
    fetch('https://books-76270-default-rtdb.firebaseio.com/books/' + key + '.json', {
        method: "delete"
    })
    setTimeout(()=>window.location.pathname='D:\\Users\\Windows\\Desktop\\library\\Catalog\\catalog.html',500)
}
async function getData() {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    return data
}
function findBook(old, data) {
    for (const key in data) {
        if (data[key].name == old) {
            return key
        }
    }
}
add()