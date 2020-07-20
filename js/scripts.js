const name = document.querySelector('#name');
const mail = document.querySelector('.card-text');
const address = document.querySelector('.card-text cap');
const img = document.querySelector('.card-img'); 


/*
FETCH FUNCTIONS
*/
function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Error occured', error))
}

Promise.all([
    fetchData('https://randomuser.me/api/?inc=name,location,email,picture')
])
    .then(data => {
        const test = console.log(data[0].results[0].location.city);
        const empName = `${data[0].results[0].name.first} ${data[0].results[0].name.last}`;
        const empMail = `${data[0].results[0].email}`;
        const empImg = `${data[0].results[0].picture.thumbnail}`;
        const empAdd = `${data[0].results[0].location.city}, ${data[0].results[0].location.state}`;

        setName(empName);
        setMail(empMail);
        setImg(empImg);
        setAdd(empAdd);
    })


/*
HELPER FUNCTIONS
*/
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    }else{
        return Promise.reject( new Error(response.statusText));
    }
}
function setName(data){
     name.innerHTML = `${data}`;
    }

function setMail(data){
    mail.innerHTML = `${data}`;
}

function setImg(data){
        img.src= `${data}`;
}

function setAdd(data){
    address.innerHTML = `${data}`;
}