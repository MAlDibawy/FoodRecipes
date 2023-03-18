
let dataFetchTimer;

$(document).ready(() => {
    closeSideNav();
    searchByName('');
})


$('.open-close').on('click', () => {
    if ($('.side-nav').css('left') == '0px') {
        closeSideNav();
    } else {
        openSideNav();
    }
})

function openSideNav() {
    $('.side-nav').animate(({
        left: 0
    }), 500);

    $(".open-close").removeClass("fa-align-justify");
    $(".open-close").addClass("fa-x");

    const listItems = $('.side-nav .nav-tab .links li');
    listItems.each((index, elem) => $(elem).animate({ top: 0 }, (index + 5) * 100));
}


function closeSideNav() {
    let navHeaderWidth = $('.nav-tab').outerWidth();
    $('.side-nav').animate({ left: -navHeaderWidth }, 500);

    $('.open-close').addClass('fa-align-justify').removeClass('fa-x');
    const listItems = $('.side-nav .nav-tab .links li');
    listItems.each((index, elem) => $(elem).animate({ top: 400 }, 500))
}


function searchByName(name) {

    $('#data').html('');
    $('.search-loading').fadeIn(300);

    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayMeals(data.meals) : displayMeals([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);

}

function searchByFirstLetter(letter) {

    $('#data').html('');
    $('.search-loading').fadeIn(300);

    const api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayMeals(data.meals) : displayMeals([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);

}


function displayMeals(data) {
    $('#data').html('');
    let container = ``;
    for (let i = 0; i < data.length; i++) {
        const meal = data[i];
        container += `
        <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="meal">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 w-100 h-100"  onclick=(getMealDetails('${meal.idMeal}'))>
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
        `
    }
    $('#data').html(container);
}


function getMealDetails(mealId) {

    $('#data').html('');
    $('#search').html('');
    $('.search-loading').fadeIn(300);

    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayMealDetails(data.meals[0]) : displayMealDetails([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);
}

function displayMealDetails(data) {
    $('#data').html('');
    closeSideNav();

    let ingredients = ``;

    for (let i = 0; i < 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<p class="bg-info bg-opacity-25 d-inline-block p-2 m-2 rounded-2 "><span >${data[`strMeasure${i}`]} </span> <span>${data[`strIngredient${i}`]}</span></p> `;
        }
    }

    let container = `
    
        <div class="col-md-4 text-white">
                <img class="w-100" src="${data.strMealThumb}" alt="meal details">
                <h3> ${data.strMeal} </h3>
        </div>
        <div class="col-md-8 text-white">
            <div>
                <h2>Instructions</h2>
                <p>${data.strInstructions}</p>
            </div>
            <p class="fa-2x"><span class="fw-bolder">Area: </span> ${data.strArea}</p>
            <p class="fa-2x"><span class="fw-bolder">Category: </span> ${data.strCategory}</p>
            <h4>Recipes:</h4>
            <p>${ingredients}</p>
            <p class="fa-2x"><span class="fw-bolder">Tags: </span>${data.strTags}</p>
            <a class="btn btn-success m-1 p-2" href="${data.strSource ? data.strSource : ''}">Source</a>
            <a class="btn btn-danger m-1 p-2" href="${data.strYoutube ? data.strYoutube : ''}">Youtube</a>
            
        </div>

    `;



    $('#data').html(container);

}
function getCategories() {
    $('#data').html('');
    $('.search-loading').fadeIn(300);
    $('#search').html('');
    const api = `https://www.themealdb.com/api/json/v1/1/categories.php`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.categories.length > 0 ? displayCategories(data.categories) : displayCategories([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);
}

function displayCategories(data) {
    $('#data').html('');
    closeSideNav();
    let container = ``;
    for (let i = 0; i < data.length; i++) {
        const cat = data[i];
        container += `
        <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${cat.strCategoryThumb}" alt="meal"))>
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 w-100 h-100 flex-column text-center" onclick="getCategoryMeals('${cat.strCategory}')">
                    <h3>${cat.strCategory}</h3>
                    <p> ${cat.strCategoryDescription}</p>
                </div>
            </div>
        </div>
        `
    }

    $('#data').html(container);
}

function getAreas() {
    $('#data').html('');
    $('.search-loading').fadeIn(300);
    $('#search').html('');
    const api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayAreas(data.meals) : displayAreas([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);
}

function displayAreas(data) {
    $('#data').html('');
    closeSideNav();
    let container = ``;
    for (let i = 0; i < data.length; i++) {
        const area = data[i];
        console.log(area);
        container += `
        <div class="col-md-3" onclick="getAreaMeals('${area.strArea}')">
            <div class="text-center text-white area position-relative rounded-2 cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
            </div>
        </div>
        `
    }
    $('#data').html(container);
}

function getAreaMeals(areaName) {
    $('#data').html('');
    $('.search-loading').fadeIn(300);
    $('#search').html('');
    const api = ` https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayMeals(data.meals) : displayMeals([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);

}

function getCategoryMeals(catName) {
    $('#data').html('');
    $('.search-loading').fadeIn(300);
    $('#search').html('');
    const api = ` https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayMeals(data.meals) : displayMeals([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);

}

function getIngredients() {
    $('#data').html('');
    $('.search-loading').fadeIn(300);
    $('#search').html('');
    const api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayIngredients(data.meals) : displayIngredients([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);
}

function displayIngredients(data) {
    $('#data').html('');
    closeSideNav();
    let container = ``;
    for (let i = 0; i < data.length; i++) {
        const ingredient = data[i];
        const desc = ingredient.strDescription;

        container += `
        <div class="col-md-3" onclick="getIngredientMeals('${ingredient.strIngredient}')" onclick="getIngredientMeals('${ingredient.strIngredient}')">
            <div class="text-center text-white area rounded-2 cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>

                <p>${desc?.substring(0, 100)}</p>
            </div>
        </div>
        `
    }
    $('#data').html(container);
}

function getIngredientMeals(ingName) {
    $('#data').html('');
    $('.search-loading').fadeIn(300);
    $('#search').html('');
    const api = ` https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`;

    clearTimeout(dataFetchTimer);
    dataFetchTimer = setTimeout(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                data.meals.length > 0 ? displayMeals(data.meals) : displayMeals([]);
                $('.search-loading').fadeOut(300);
            })
            .catch(() => $('.search-loading').fadeOut(300))
    }, 400);
}

function showSearchInputs() {
    closeSideNav();
    const searchInputs = `
    <div class="row py-4">
        <div class="col-md-6">
            <input class="form-control bg-transparent text-white" type="text" name="searchByName" id="searchByName" onkeyup="searchByName(this.value)"
                placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input class="form-control bg-transparent text-white" type="text" name="searchByFirstLetter" id="searchByFirstLetter"
                onkeyup="searchByFirstLetter(this.value)" placeholder="Search By First Letter">
        </div>
    </div>`
    $('.searchInp').html(searchInputs);
    $('#data').html('');
}

let submitBtn;
let nameInputFocused = false, emailInputFocused = false, phoneInputFocused = false, ageInputFocused = false,
    passwordInputFocused = false, repasswordInputFocused = false;


function showContactForm() {
    let form = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
    $('#data').html(form);

    submitBtn = $('#submitBtn');

    $("#nameInput").on("focus", () => {
        nameInputFocused = true;
    })

    $("#emailInput").on("focus", () => {
        emailInputFocused = true;
    })

    $("#phoneInput").on("focus", () => {
        phoneInputFocused = true;
    })

    $("#ageInput").on("focus", () => {
        ageInputFocused = true;
    })

    $("#passwordInput").on("focus", () => {
        passwordInputFocused = true;
    })

    $("#repasswordInput").on("focus", () => {
        repasswordInputFocused = true;
    })

}

function inputsValidation() {
    if (nameInputFocused) {
        if (nameValidation()) {
            $("#nameAlert").removeClass("d-block").addClass("d-none");

        } else {
            $("#nameAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if (emailInputFocused) {
        if (emailValidation()) {
            $("#emailAlert").removeClass("d-block").addClass("d-none");
        }
        else {
            $("#emailAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if (phoneInputFocused) {
        if (phoneValidation()) {
            $("#phoneAlert").removeClass("d-block").addClass("d-none");
        }
        else {
            $("#phoneAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if (ageInputFocused) {
        if (ageValidation()) {
            $('#ageAlert').removeClass("d-block").addClass("d-none");
        }
        else {
            $('#ageAlert').removeClass("d-none").addClass("d-block");
        }
    }
    if (passwordInputFocused) {
        if (passwordValidation()) {
            $('#passwordAlert').removeClass("d-block").addClass("d-none");
        }
        else {
            $('#passwordAlert').removeClass("d-none").addClass("d-block");
        }
    }
    if (repasswordInputFocused) {
        if (passwordValidation()) {
            $('#repasswordAlert').removeClass("d-block").addClass("d-none");
        }
        else {
            $('#repasswordAlert').removeClass("d-none").addClass("d-block");
        }
    }

    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttr("disabled");
    }
    else {
        submitBtn.attr("disabled", true);
    }

}


function nameValidation() {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test($('#nameInput').val());
}

function emailValidation() {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test($('#emailInput').val());
}

function ageValidation() {
    const regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return regex.test($('#ageInput').val());
}

function phoneValidation() {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test($('#phoneInput').val());
}


function passwordValidation() {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test($('#passwordInput').val());
}

function repasswordValidation() {
    return $('#passwordInput').val() == $('#repasswordInput').val();
}

