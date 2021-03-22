import { html } from '../../node_modules/lit-html/lit-html.js'
import { editArticle, getArticle } from '../api/data.js'

const template = (article, onSubmit, errorMsg) => html`
<div class="container">
    <form action="#" method="" @submit=${onSubmit}>
        ${errorMsg ? html`<div style="color:red;font-size:20px">${errorMsg}</div>` : ''}
        <fieldset>
            <legend>Edit article</legend>
            <p class="field title">
                <input type="text" name="title" id="title" .value=${article.title}>
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" name="category" id="category" .value=${article.category}>
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content" .value=${article.content}></textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Edit</button>
            </p>

        </fieldset>
    </form>
</div>`


export async function edit(ctx) {
    ctx.render(template(await getArticle(ctx.params.id), onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const title = data.get('title')
        const category = data.get('category')
        const content = data.get('content')
        if (title == "" || category == "" || content == "") {
            return ctx.render(template(await getArticle(ctx.params.id), onSubmit, 'All fields are required!'))
        }

        await editArticle(ctx.params.id,{title,category,content,_ownerId:sessionStorage.getItem('userId')})
        ctx.page.redirect('/details/'+ctx.params.id)
    }
}