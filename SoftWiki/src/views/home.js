import { html } from '../../node_modules/lit-html/lit-html.js'
import {getArticles} from '../api/data.js'

const catalogTemplate = (data = []) => html`
<div class="content">
    <section class="js">
        <h2>JavaScript</h2>
        <div class="articles">
            ${data.length > 0 ? data.filter(x => x.category == 'JavaScript').map(articleTemplate) :
            html`<h3 class="no-articles">No articles yet</h3>`}
        </div>
    </section>
    <section class="CSharp">
        <h2>C#</h2>
        <div class="articles">
            ${data.length > 0 ? data.filter(x => x.category == 'C#').map(articleTemplate) :
            html`<h3 class="no-articles">No articles yet</h3>`}
        </div>
    </section>
    <section class="Java">
        <h2>Java</h2>
        <div class="articles">
            ${data.length > 0 ? data.filter(x => x.category == 'Java').map(articleTemplate) :
        html`<h3 class="no-articles">No articles yet</h3>`}
        </div>
    </section>
    <section class="Pyton">
        <h2>Pyton</h2>
        <div class="articles">
            ${data.length > 0 ? data.filter(x => x.category == 'Python').map(articleTemplate) :
        html`<h3 class="no-articles">No articles yet</h3>`}
        </div>
    </section>
</div>`

const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>`


export async function home(ctx) {
    ctx.setupNav()
    ctx.render(catalogTemplate(Object.values(await getArticles())))
}