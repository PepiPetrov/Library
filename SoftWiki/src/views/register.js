import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js'

const registerTemplate = (onSubmit, errorMsg) => html`
<div class="container auth">
    <form action="#" method="" @submit=${onSubmit}>
        ${errorMsg ? html`<div style="color:red;font-size:20px">${errorMsg}</div>` : ''}
        <fieldset>
            <legend>Register</legend>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" name="password" id="register-pass">
                <label for="register-pass">Password:</label>
            </p>
            <p class="field password">
                <input type="password" name="rep-pass" id="rep-pass">
                <label for="rep-pass">Repeat password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Register</button>
            </p>
            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</div>`

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()].map(x => x[1])
        if (data.includes('')) {
            return ctx.render(registerTemplate(onSubmit, 'All fields are required!'))
        }
        if (data[1] != data[2]) {
            return ctx.render(registerTemplate(onSubmit, 'Passwords don\'t match!'))
        }

        await register(data[0], data[1])
        ctx.page.redirect('/')
    }
}