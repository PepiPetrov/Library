import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { home } from './views/home.js'
import { logout } from './api/data.js'
import { registerPage } from './views/register.js'
import { details } from './views/details.js'
import { edit } from './views/edit.js'
import { login } from './views/login.js'
import { create } from './views/create.js'

page('/', decorate, home)
page('/register', decorate, registerPage)
page('/details/:id', decorate, details)
page('/edit/:id', decorate, edit)
page('/login', decorate, login)
page('/create', decorate, create)

setupNav()
page.start()

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout()
    setupNav()
})

function decorate(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'))
    ctx.setupNav = () => setupNav
    next()
}

function setupNav() {
    if (sessionStorage.getItem('userId')) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}