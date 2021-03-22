import { html } from '../../node_modules/lit-html/lit-html.js'
import {login as log} from '../api/data.js'

const template = (onSubmit, errorMsg) => html`
<div class="container auth">
    <form action="#" method="" @submit=${onSubmit}>
        ${errorMsg ? html`<div style="color:red;font-size:20px">${errorMsg}</div>` : ''}
        <fieldset>
            <legend>Login</legend>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                increase in quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" id="login-pass" name="password">
                <label for="login-pass">Password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Log In</button>
            </p>
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</div>`

export async function login(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const data=new FormData(e.target)
        const email=data.get('email')
        const password=data.get('password')
        if(email==''||password==''){
            return ctx.render(template(onSubmit,'All fileds are requred!'))
        }
        await log(email,password)
        window.location.reload()
        window.location.href="http://localhost:3002"
        ctx.page.redirect('/')
    }
}