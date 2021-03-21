async function addToMain() {
    const ul = document.querySelector('main')
    ul.innerHTML='Loading&hellip;'
    const books=await getData()
    if(books==null){
        ul.innerHTML='Catalog is empty. But you can <a href="../Add/add.html">Add your first book</a>'
        return
    }
    const values=Object.values(books)
    values.sort((a,b)=>a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
    ul.innerHTML=''
    values.forEach(x=>{
        const a=document.createElement('button')
        a.innerText=x.name
        const divInfo=document.createElement('div')
        const title=document.createElement('p')
        title.textContent=`Title: ${x.name}`
        const author=document.createElement('p')
        author.textContent=`Author: ${x.author}`
        const genre=document.createElement('p')
        genre.textContent=`Genre: ${x.genre}`
        const description=document.createElement('p')
        description.textContent=`Description: \n${x.description}`
        const publisher=document.createElement('p')
        publisher.textContent=`Publisher: ${x.publisher}`
        const yearOfpublishing=document.createElement('p')
        yearOfpublishing.textContent=`Year of publishing: ${x.year}`
        const img=document.createElement('img')
        img.src=x.img
        img.alt='No image'
        divInfo.appendChild(title)
        divInfo.appendChild(author)
        divInfo.appendChild(genre)
        divInfo.appendChild(description)
        divInfo.appendChild(publisher)
        divInfo.appendChild(yearOfpublishing)
        divInfo.appendChild(img)
        divInfo.style.display='none'
        a.addEventListener('click',()=>{
         if(divInfo.style.display=='none'){
            divInfo.style.display='block'
         }else{
            divInfo.style.display='none'
         }
        })
        ul.appendChild(a)
        ul.appendChild(divInfo)
        ul.appendChild(document.createElement('br'))
    })
}
async function getData(){
    const response=await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data=await response.json()
    return data
}
addToMain()