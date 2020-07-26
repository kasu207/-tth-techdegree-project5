/*
URL
*/
const randomUsrUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,picture'
/*

/**
 * DOM Elements 
*/
const gallery = document.querySelector('#gallery');
/*
const name = document.querySelector('#name');
const mail = document.querySelector('.card-text');
const address = document.querySelector('#address');
const img = document.querySelector('.card-img');
*/

/*
HANDLE ALL FETCH REQUESTS
*/
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function getRandomUsrData(url) {
    const usrJSON = await getJSON(url);

    const profiles = usrJSON.results.map(async (user) => {
        const name = user.name;
        const email = user.email;
        const picture = user.picture;
        const location = user.location;

        return {
            name,
            email,
            picture,
            location
        }

    });

    return Promise.all(profiles);
}

/*
HELPER FUNCTIONS
*/

/*
WEBDEV-Funcionality
*/
function createCard(data) {
    data.map(user => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        gallery.appendChild(cardDiv);
        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p id="address" class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
    `;

    });
}

document.addEventListener('DOMContentLoaded', () => {
    getRandomUsrData(randomUsrUrl)
        .then(createCard)
        .catch( e => {
            gallery.innerHTML = '<h3>Something went wrong</h3>';
            console.log(e);
        })
});