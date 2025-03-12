const list = document.querySelector(`#list`);
const abc = document.querySelector(`#abc`);
const searchAlf = document.querySelector(`#searchAlf`);
const searchInput = document.querySelector("#searchInput"); 
const homeBtn = document.querySelector(`#homeBtn`)          
const randomBtn= document.querySelector(`#randomBtn`)
const _baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;
const _randomUrl = `https://www.themealdb.com/api/json/v1/1/random.php`
let mealsData = []; 

function getAMeals(alfabet=`a`) {
    fetch(_baseUrl+alfabet)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.meals) {
                mealsData = data.meals; 
                showAll(mealsData, alfabet);
            }
        })
}

getAMeals(`a`);

function showAll(arr) {
    abc.innerHTML = `<h2 id="abc" style="text-align: center; color: white;">Meals starting with 'A'</h2>`;
    list.innerHTML = "";
    arr.forEach(item => {
        list.innerHTML += `
        <div class="card">
            <img src="${item.strMealThumb}" class="card-img-top" alt="${item.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${item.strMeal}</h5>
            </div>
        </div>
        `;
    });
}

function alfb() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    searchAlf.innerHTML = alphabet
        .map(letter => `<span class="alfabet" onclick="getAMeals('${letter.toLowerCase()}')">${letter.toUpperCase()}</span>`)
        .join(" / ");
}
alfb()

homeBtn.addEventListener(`click`, () => getAMeals("a"));

function searchFood() {
    const searchText = searchInput.value.toLowerCase().trim();
    let result = mealsData.filter(item =>
        item.strMeal.toLowerCase().includes(searchText)
    );
    if (result.length > 0) {
        showAll(result);
    } else {
        list.innerHTML = `<p style="text-align: center; color: white;"> Not found check your information</p>`;
    }
    searchInput.value = "";
}

randomBtn.onclick = () => {
    fetch(_randomUrl)
        .then(response => response.json())
        .then(random => {
            if (random.meals) {
                showAll(random.meals); 
            }
        })
};
