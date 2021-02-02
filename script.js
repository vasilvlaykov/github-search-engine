const APIURL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createUserCard(respData);
    getRepos(user);
}

async function getRepos(user) {
    const resp = await fetch(APIURL + user + '/repos');
    const respData = await resp.json();
    addReposToCard(respData);
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div class="img-container">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </a>
        </div>
        <div class="user-info">
            <h2>${user.name !== null ? user.name : user.login}</h2>
            <p>${user.bio !== null ? user.bio : ''}</p>
            <ul class="info">
                <li><i class="fas fa-user-friends"></i> ${user.followers}</li>
                <li><i class="fas fa-heart"></i> ${user.following}</li>
                <li><i class="fas fa-folder-open"></i> ${user.public_repos}</li>
            </ul>
            <h4>Repositories:</h4>
            <div class="repos" id="repos">
            </div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposElement = document.getElementById("repos");
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 15).forEach(r => {
            const element = document.createElement('a');
            element.classList.add('repo');
            element.href = r.html_url;
            element.target = "_blank";
            element.innerText = r.name;

            reposElement.appendChild(element);
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});