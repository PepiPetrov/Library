async function getData(title) {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    const all = Object.values(data)
    return all.find(x => x.name == title)
}

async function render() {
    const encodedTitle = window.location.search.split('=')[1]
    const decodedTitle = decodeURIComponent(encodedTitle)
    const x = await getData(decodedTitle)
    const divInfo = document.createElement('div')
    const title = document.createElement('p')
    title.textContent = `Title: ${x.name}`
    const author = document.createElement('p')
    author.textContent = `Author: ${x.author}`
    const genre = document.createElement('p')
    genre.textContent = `Genre: ${x.genre}`
    const description = document.createElement('p')
    description.textContent = `Description: \n${x.description}`
    const publisher = document.createElement('p')
    publisher.textContent = `Publisher: ${x.publisher}`
    const yearOfpublishing = document.createElement('p')
    yearOfpublishing.textContent = `Year of publishing: ${x.year}`
    const img = document.createElement('img')
    img.src = x.img
    img.alt = 'No image'
    const page = document.createElement('p')
    page.textContent = `Pages: ${x.pages}`
    divInfo.appendChild(title)
    divInfo.appendChild(author)
    divInfo.appendChild(genre)
    divInfo.appendChild(description)
    divInfo.appendChild(publisher)
    divInfo.appendChild(yearOfpublishing)
    divInfo.appendChild(page)
    const edit = document.createElement('a')
    edit.innerText = "Edit book"
    edit.href = "file:///D:/Users/Windows/Desktop/library/Edit/editAbook.html?title=" + decodedTitle
    divInfo.appendChild(edit)
    divInfo.innerHTML += '&nbsp;&nbsp;&nbsp;'
    const remove = document.createElement('a')
    remove.innerText = "Remove book"
    remove.href = "file:///D:/Users/Windows/Desktop/library/Remove/remove.html?title=" + decodedTitle
    divInfo.appendChild(remove)
    document.querySelector('main').appendChild(divInfo)
    divInfo.appendChild(img)
}

render()