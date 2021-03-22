import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAritcle } from '../api/data.js'

const template = (onSubmit, errorMsg) => html`
<div class="container">
    <form action="#" method="" @submit=${onSubmit}>
        <fieldset>
            ${errorMsg ? html`<div style="color:red;font-size:20px">${errorMsg}</div>` : ''}
            <legend>Create article</legend>
            <p class="field title">
                <input type="text" id="title" name="title" placeholder="Arrays">
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" id="category" name="category" placeholder="JavaScript">
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content"></textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Create</button>
            </p>

        </fieldset>
    </form>
</div>`

export async function create(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const [title,category,content]=[...data.entries()].map(x=>x[1])
        if(title==''||category==''||content==''){
            return ctx.render(template(onSubmit,'All fields are requred!'))
        }
        const res=await createAritcle({title,category,content,_ownerId:sessionStorage.getItem('userId')})
        ctx.page.redirect(`/details/${res._id}`)
    }
}