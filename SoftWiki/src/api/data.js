import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getArticles() {
    const teams = await api.get(host + '/jsonstore/wiki');
    return teams;
}

export async function getArticle(id) {
    return await api.get(host + '/jsonstore/wiki/' + id);
}

export async function createAritcle(article) {
    article.likes=0
    const result = await api.post(host + '/jsonstore/wiki', article);
    
    return result;
}

export async function editArticle(id, article) {
    return await api.put(host + '/jsonstore/wiki/' + id, article);
}

export async function deleteArticle(id) {
    return await api.del(host + '/jsonstore/wiki/' + id);
}