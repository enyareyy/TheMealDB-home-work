const list = document.querySelector(`#list`);
const searchAlf = document.querySelector(`#searchAlf`);
const searchInput = document.querySelector("#searchInput"); 
const homeBtn = document.querySelector(`#homeBtn`)          
const randomBtn= document.querySelector(`#randomBtn`)
const abc1 = document.querySelector(`#abc`);
const abc = document.querySelectorAll(`a`)

const _baseUrl = `https://www.themealdb.com/api/json/v1/1/`;

const searchAbc = `search.php?f=`
const search = `search.php?s=`
const _randomUrl = `random.php`
const categoriesUrl = `categories.php`
const idMeals = `lookup.php?i=`
const searchIngredient = `filter.php?i=`;

// главная страница категории меню отображение запрос API
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



//функция выводим id еды затем уже данные блюда запрос API
function getMealsByID(id){
    fetch(_baseUrl+idMeals+id)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        showIngredient(data.meals)
    })
}
//очищаем затем выводим данные в браузер
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
                    <div class="ingredient-card" onclick ="getIngredientMeals('${ingredient}')"> 
                    <img src="https://www.themealdb.com/images/ingredients/${ingredient}-small.png" class="card-img-top" alt="">
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


//после онклика зарабатывает эта функция где берем данные из API, ingredient это название ингредиента на который уже кликнули 
function getIngredientMeals(ingredient) { 
    fetch(_baseUrl + searchIngredient + ingredient)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.meals) {
                showIngredientMeals(data.meals, ingredient);
            }
        })
}
// отображается в браузере 
function showIngredientMeals(arr, ingredient) {
    abc.innerHTML = "";
    list.innerHTML = "";
console.log(ingredient);

    abc1.innerHTML = `
        <div class="abcIng"> 
            <h2>${ingredient}</h2>
        </div>`
    list.innerHTML=`
        <div class="ingCard"> 
            <div class = "ingImg"> 
                <img  src="https://www.themealdb.com/images/ingredients/${ingredient}-small.png" alt="${ingredient}" > 
            </div>

            <div class = "ingMeals"> 
                ${arr.map(item => `
                    <div class="cardIng" > 
                        <img src="${item.strMealThumb}"alt="${item.strMeal}" > 
                        <h5 class="card-title" >${item.strMeal}</h5> 
                    </div>
                `) 
                }
            </div>
        </div>
    `;
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



//функция поиска по названию, если есть выдает еду если нет выходит что ошибка 
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
randomBtn.onclick = () => {
    fetch(_baseUrl+_randomUrl)
        .then(response => response.json())
        .then(random => {
            if (random.meals) {
                showAll(random.meals); 
            }
        })
};