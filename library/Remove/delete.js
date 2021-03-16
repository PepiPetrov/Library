async function add(e) {
    e.preventDefault()
    const old = document.getElementById('old').value
    const value = await getData()
    const key = findBook(old, value)
    document.getElementById('old').value=''
    if(key==undefined){
        return alert('Book not found!')
    }
    fetch('https://books-76270-default-rtdb.firebaseio.com/books/' + key+'.json', {
        method: "delete"
    })
    alert('Book successfully removed!')
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
document.querySelector('form').addEventListener('submit',add)