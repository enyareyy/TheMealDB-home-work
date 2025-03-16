const list = document.querySelector(`#list`);
const searchAlf = document.querySelector(`#searchAlf`);
const searchInput = document.querySelector("#searchInput"); 
const homeBtn = document.querySelector(`#homeBtn`)          
const randomBtn= document.querySelector(`#randomBtn`)
const abc1 = document.querySelector(`#abc`);
const _baseUrl = `https://www.themealdb.com/api/json/v1/1/`;
const searchAbc = `search.php?f=`
const search = `search.php?s=`
const categoriesUrl = `categories.php`
const idMeals = `lookup.php?i=`
const abc = document.querySelectorAll(`a`)
// let mealsData = []; 



// главная стрница категории меню отоброжение
function getAMeals() {
    fetch(_baseUrl+categoriesUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.categories) { 
                showCategories(data.categories);
            } 
        })
}
// категории меню что должно высветиться в браузере 
function showCategories(arr) {
    abc1.innerHTML = `<h2 style="text-align: center; color: white;">Meal Categories</h2>`;
    for (const item of arr) {
        list.innerHTML += `
        <div class="card" style="margin: 10px; text-align: center; ">
            <img src="${item.strCategoryThumb}" class="card-img-top" alt="${item.strCategory}" style="width: 100%;">
            <h5 class="card-title" style="margin-top: 5px;">${item.strCategory}</h5>
        </div>
        `;
    }
}
getAMeals(); 
//при клике на home отображаются категории 
homeBtn.onclick=()=>{
    list.innerHTML = "";
    getAMeals();
}



//функия выводим id еды затем уже данные блюда 
function getMealsByID(id){
    fetch(_baseUrl+idMeals+id)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        showIngredient(data.meals)
    })
}
function showIngredient(arr){
    abc.innerHTML = ""
    list.innerHTML = "";
    for (const item of arr) {
        let ingredientsBlocks = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = item[`strIngredient${i}`];
            const measure = item[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredientsBlocks += `
                    <div class="ingredient-card">
                        <p>${ingredient}
                        <br>
                        ${measure}</p>
                    </div>`;
            }
        } 
        abc1.innerHTML = `<h2 style="text-align: center; color: white;">${item.strMeal}</h2>`;
        list.innerHTML +=  `
        <div class="card-ing">
            <div class="card-img-body">
            <div class="card-img">
                <img src="${item.strMealThumb}" class="card-img-top" alt="${item.strMeal}">
            </div>
            <div class="card-body">
                    <div class="ingredients-container">
                        ${ingredientsBlocks}
                    </div>
                </div>
            </div>
            <div class="ingrd">
                <h3 style="text-align: center;">Instructions:</h3>
                <p style="text-align: justify; padding: 10px;">${item.strInstructions}</p>
            </div>
        </div>`;
    }
}



//функция по алфавиту, если есть еда на букву она отображается в браузере, если нет выходит ошибка 
function getMealsByABC(tamga){    
    fetch(_baseUrl+ searchAbc+ tamga)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals);
        if (data.meals) {
            showAll(data.meals);
        } else {
            list.innerHTML = "<h2 style='text-align: center; color: white;'>Not found</h2>";
        }
    })
}
//отображается в браузере 
function showAll(arr) {
    abc1.innerHTML = `<h2 id="abc" style="text-align: center; color: white;">Meals</h2>`;
    list.innerHTML = "";
    for (const item of arr){
        list.innerHTML += `
        <div class="card" onclick = "getMealsByID(${item.idMeal})">
            <img src="${item.strMealThumb}" class="card-img-top" alt="${item.strMeal}">
                <h5 class="card-title">${item.strMeal}</h5>
        </div>
        `;
    };
}
//запускает функцию после клика
abc.forEach((letter)=>{
    letter.onclick=()=>{
        console.log(letter.innerText.toLowerCase());
        getMealsByABC(letter.innerText.toLowerCase())
    }
    
})



//функция поиска по названию, если есть выдает еду если нет выходит что нет 
function getSearchName(name){
    fetch(_baseUrl+search+name)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if (data.meals){
            showAll(data.meals)
        } else {
            list.innerHTML = "<h2 style='text-align: center; color: white;'>Not found</h2>";
        }
    })
}
//onchange при поиске еды выдает еду 
searchInput.onchange=()=>{
    console.log(searchInput.value);
    getSearchName(searchInput.value)
    searchInput.value=``
}



// при клике на рандом выдает рандомную еду 
const _randomUrl = `random.php`
randomBtn.onclick = () => {
    fetch(_baseUrl+_randomUrl)
        .then(response => response.json())
        .then(random => {
            if (random.meals) {
                showAll(random.meals); 
            }
        })
};