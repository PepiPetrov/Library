import { html } from '../../node_modules/lit-html/lit-html.js'
import { getArticle, deleteArticle } from '../api/data.js'

const detailsTemplate = (article,onDelete) => html`
<div class="container details">
    <div class="details-content">
        <h2>${article.title}</h2>
        <strong>${article.category}</strong>
        <p>${article.content}</p>
        <div class="buttons">
            ${sessionStorage.getItem('userId')==article._ownerId?html`
            <a href="javascript:void(0)" class="btn delete" @click=${onDelete}>Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>`:''}
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</div>`



export async function details(ctx) {
    ctx.render(detailsTemplate(await getArticle(ctx.params.id),onDelete))
    async function onDelete(){
        if(confirm('Are you sure?')){
            await deleteArticle(ctx.params.id)
            ctx.page.redirect('/')
        }
    }
}