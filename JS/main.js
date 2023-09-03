
$(document).ready(() => {
  $(".outer-loading").fadeOut(1000);
    })


// ^ Handle navBar Animation :
// let navBar = document.querySelector(".main-container");
// let exit = document.querySelector(".fa-globe");
// let openBtn = document.getElementById("openBtn")
// let openIcon = document.getElementById("open")
// let closeIcon = document.getElementById("close")

$("#open").click(function(){
  $(".main-container").css("left" , "0px")
  $("#close").removeClass("d-none");
  $("#open").addClass("d-none");

  $(".search").show(300 ,function(){
    $(".categories").show(300 , function(){
      $(".area").show(300 ,function(){
        $(".ingredients").show(300 , function(){
          $(".contact").show(300)
        })
      })
    })
  });
})



$("#close").click(function(){
  $(".main-container").css("left" , "-230px");
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");

  $(".search").hide(1000);
  $(".categories").hide(1000);
  $(".area").hide(1000);
  $(".ingredients").hide(1000);
  $(".contact").hide(1000);
})




const rowData = document.getElementById("rowData") ;
// ^ NavBar :
const allLinks = document.querySelectorAll(".links ul li");


//& ====================== Function Get Current Section  =========================================
// ^ Add Event On All Li In Navbar
  $(".links ul li").click(function (e){
    if(e.target.getAttribute("class") === "search"){
      console.log("=>JQuery search");
      AddSearch();
    }else if (e.target.getAttribute("class") === "categories"){
      console.log("=>JQuery categories");
      getCategory();
    }else if(e.target.getAttribute("class") === "area"){
      console.log("=>JQuery area");
      getArea();
    }else if(e.target.getAttribute("class") === "ingredients"){
      console.log("=>JQuery ingredients");
      getIngredients();
    }else if(e.target.getAttribute("class") === "contact"){
      console.log("=>JQuery contact");
      addContact();
    }

  $(".main-container").css("left" , "-230px");
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");
  })
//& ==============================================================================================








//& Function Add Data In Inner HTML Inter The Home Section:===========================

    // * Api Filter By Area  :
    async function getDataHome(){
      let api = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian");
      let result = await api.json();
      let response = result.meals;
      displayDataHome (response)
      // console.log(response);
      }
      getDataHome()

    // * Function Display Data Home :
    function displayDataHome (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        cartona += 
        `
          <div class="col-md-3">
            <div class="item  rounded-4  overflow-hidden position-relative">
              <img src="${element.strMealThumb}" alt="meals" class="w-100 ">
              <div data-id="${element.idMeal}" class="titleImage position-absolute d-flex align-items-center">
                <h2>${element.strMeal}</h2>
              </div>
            </div>
          </div>
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventAllHome(allBoxMeals)
    }
    
    // * Add Event On All Box Meals :
    function addEventAllHome(array){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        $(element).click(function(e){
          checkIdAllHome(e)
        })
      }
    }

    // * Function Get Id And Get Element Id Of Array :
    async function checkIdAllHome(e){
      let id = e.target.getAttribute("data-id");
      let responseElementById = await getDataById(id);
      DisplayDescription(responseElementById)
      // console.log("checkIdHome");
      // console.log(responseElementById);
    }

    // * Api get Data Meal by Id 
    async function getDataById(id){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      let result = await api.json();
      let response = result.meals[0];
      return response ;
    }

    // * Function Display Description Meals All Page In The Home Section
    function DisplayDescription(element){
      let cartona = `
        <div class="col-md-4">
          <button class="btn btn-info position-fixed top-0 end-0 m-4" onclick="location.reload()">Home Page</button>
          <div class="imageItemDetails">
            <img src="${element.strMealThumb}"  class="w-100 rounded-4 overflow-hidden" alt="image">
            <h2 class="mt-3 text-white">${element.strMeal}</h2>
          </div>
        </div>
        <div class="col-md-8">
          <div class="textItemDetails text-white p-4 pt-0">
            <h2 class="fw-bold mb-2">Instructions</h2>
            <p>${element.strInstructions}.</p>
            <h2 class="fw-bold mb-2">Area : ${element.strArea}</h2>
            <h2 class="fw-bold mb-2">Category : ${element.strCategory}</h2>
            <h3 class="fw-bold mb-2">Recipes :</h3>
            <div class="span">
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient1}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient2}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient3}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient4}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient5}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient6}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient7}</span>
              <span class="p-1 rounded-2 d-inline-block m-2 bg-primary-subtle text-black">${element.strIngredient8}</span>
            </div>
            <h2 class="my-2">Tags :</h2>
            <span class="p-1 rounded-2 d-inline-block m-2 bg-danger-subtle text-danger-emphasis" >${element.strTags === null ? "Not Found" : element.strTags}</span>
            <div class="btnDiv my-3">
            <button class="btn btn-success "><a class="text-white" href="${element.strSource}">Source</a></button>
            <button class="btn btn-danger "><a class="text-white" href="${element.strYoutube}">YouTube</a></button>
            </div>
          </div>
        </div>
        `
        document.getElementById("rowDataSearch").innerHTML = "";
        document.getElementById("inputSearch").innerHTML = "";
        document.getElementById("rowData").innerHTML = cartona;
      }
  //& =================================================================================================






//& Function Add Data In Inner HTML Inter The Search Section:============================
//^ Function Add Data In Search Section : 
function AddSearch(){
  document.getElementById("rowData").innerHTML = "";

  document.getElementById("inputSearch").innerHTML = `
    <div class="formInput d-flex mt-4 text-center justify-content-center" id="formInput">
      <input type="text" class="form-control mx-1 bg-black text-white" id="SearchInputName" placeholder="Search By Name">
      <input type="text" class="form-control mx-1 bg-black text-white" maxlength="1" id="SearchInputLitter" placeholder="Search By First Litter">
    </div>
  `;

  // * Function Search Meals Name By First Litter :
  document.getElementById("SearchInputLitter").addEventListener("input" , function(){
    getDataLitter(SearchInputLitter.value);
    // $(".inner-loading").fadeIn(500);
    // $(".inner-loading").addClass("d-flex");
  })

  // * Function Search Meals Name By Name :
  document.getElementById("SearchInputName").addEventListener("input" , function(){
    getDataName(SearchInputName.value);
    // $(".inner-loading").fadeIn(500);
    // $(".inner-loading").addClass("d-flex");
  })

  // * Api Filter by Meals First Litter  :
  async function getDataLitter(litter){
    if(litter !== ""){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`);
      let result = await api.json();
      let response = await result.meals;
      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");
      
      
      $(response).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });
      displayAllMealSearch (response)
      // console.log(response);
    }
  }

  // * Api  Filter by Meals Name :
  async function getDataName(name){
    if(name !== ""){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      let result = await api.json();
      let response = result.meals;
      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");
      
      
      $(response).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });
      displayAllMealSearch (response);
      // console.log(response);
    }
  }

  // * Function Display Meals By Name And First Litter  :
  function displayAllMealSearch (array){
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      cartona += 
      `
        <div class="col-md-3 ">
          <div class="item  rounded-4  overflow-hidden position-relative">
            <img src="${element.strMealThumb}" alt="meals" class="w-100 ">
            <div data-id="${element.idMeal}" class="titleImage position-absolute d-flex align-items-center">
              <h2>${element.strMeal}</h2>
            </div>
          </div>
        </div>
      `
    }
    document.getElementById("rowDataSearch").innerHTML = cartona;
    const allBoxMeals = document.querySelectorAll(".col-md-3");
    addEventAll(allBoxMeals)
  }

  // * Add Event On All Box Meals In Search:
  function addEventAll(array){
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      $(element).click(function(e){
        checkIdAllSearch(e)
      })
    }
  }

  // * Function Get Index And Get Element Index Of Array :
  async function checkIdAllSearch(e){
    let id = e.target.getAttribute("data-id");
    let responseElementById = await getDataById(id);
    
      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(responseElementById).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });

    document.getElementById("rowDataSearch").innerHTML = "";
    document.getElementById("inputSearch").innerHTML = "";
    DisplayDescription(responseElementById)
    // console.log("checkIdAll");
    // console.log(responseElementById);
  }

  // * Api get Meal by Id 
  async function getDataById(id){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await api.json();
    let response = result.meals[0];
    return response ;
  }
}
//& =====================================================================================








//& Function Add Data In Inner HTML Inter The Category Section:===========================
//^ Function Add Data In Categories Section : 
    // * Api by main Category
    async function getCategory(){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      let result = await api.json()
      let response = result.categories;

      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(response).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });

      displayCategory (response);
      console.log(response);
    }

    // * Function Display Data Category :
    function displayCategory (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        cartona += 
        `
          <div class="col-md-3">
            <div class="item  rounded-4  overflow-hidden position-relative">
              <img src="${element.strCategoryThumb}" alt="meals" class="w-100 ">
              <div" data-category = "${element.strCategory}" class="titleImage position-absolute d-flex align-items-center">
                <h2>${element.strCategory}</h2>
              </div>
            </div>
          </div>
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventCategory(allBoxMeals)
    }

    // * Add Event On All Box Meals Category:
    function addEventCategory(array){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        $(element).click(function(e){
          checkCategory(e)
        })
      }
    }

    // * Function Get category And Get Element Category Of Array :
    async function checkCategory(e){
      let category = e.target.getAttribute("data-category");
      let responseElementById = await getDataByCategory(category);

      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(responseElementById).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });
      displayByNameCategory(responseElementById)
      // console.log("checkIdHome");
      // console.log(responseElementById);
    }

    // * Api get Data Meal by Category
    async function getDataByCategory(category){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      let result = await api.json();
      let response = result.meals;
      // console.log(response);
      return response ;
    }

    // * Function Display Data Home :
    function displayByNameCategory (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        cartona += `
          <div class="col-md-3">
            <div class="item  rounded-4  overflow-hidden position-relative">
              <img src="${element.strMealThumb}" alt="meals" class="w-100 ">
              <div data-id = "${element.idMeal}" class="titleImage position-absolute d-flex align-items-center">
                <h2>${element.strMeal}</h2>
              </div>
            </div>
          </div>
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventCategoryById(allBoxMeals)
    }

    // * Add Event On All Box Meals :
    function addEventCategoryById(array){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        $(element).click(function(e){
          checkCategoryById(e)
        })
      }
    }
    
    // * Function Get Id And Get Element Id Of Array :
    async function checkCategoryById(e){
      let id = e.target.getAttribute("data-id");
      let responseElementById = await getDataById(id);

      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(responseElementById).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });

      DisplayDescription(responseElementById)
    }
//& ======================================================================================













//& Function Add Data In Inner HTML Inter The Area Section:=================================
  //^ Function Add Data In Area Section : 
    // * Api by main Area
    async function getArea(){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
      let result = await api.json()
      let response = result.meals;

      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(response).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });

      displayArea (response);
      // console.log(response);
    }

    // * Function Display Data Area :
    function displayArea (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        cartona += 
        `
          <div class="col-md-3">
            <div  class="item text-white text-center display-1 ">
              <i data-area="${element.strArea}" class="fa-solid fa-house-laptop "></i>
              <h2>${element.strArea}</h2>
            </div>
          </div>
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventArea(allBoxMeals)
    }

    // * Add Event On All Box Meals :
    function addEventArea(array){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        $(element).click(function(e){
          checkArea(e)
        })
      }
    }

    // * Function Get category And Get Element Category Of Array :
    async function checkArea(e){
      let area = e.target.getAttribute("data-area");
      let responseElementById = await getDataByArea(area);

      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(responseElementById).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });

      displayByNameArea(responseElementById);
      // console.log("checkIdHome");
      // console.log(responseElementById);
    }

    // * Api get Data Meal by Category
    async function getDataByArea(area){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      let result = await api.json();
      let response = result.meals;
      // console.log(result);
      return response ;
    }

    // * Function Display Data Area :
    function displayByNameArea (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        cartona += 
        `
          <div class="col-md-3">
            <div class="item  rounded-4  overflow-hidden position-relative">
              <img src="${element.strMealThumb}" alt="meals" class="w-100 ">
              <div data-id= "${element.idMeal}" class="titleImage position-absolute d-flex align-items-center">
                <h2>${element.strMeal}</h2>
              </div>
            </div>
          </div>
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventCategoryById(allBoxMeals)
    }
//& ========================================================================================







//& Function Add Data In Inner HTML Inter The Ingredients Section:==========================
  //^ Function Add Data In Ingredients Section : 
    // * Api by main Ingredients
    async function getIngredients(){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      let result = await api.json()
      let response = result.meals;
      displayIngredients (response);
      // console.log(response);
    }

    // * Function Display Data Ingredients :
    function displayIngredients (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(element.strDescription === null){
          continue 
        }
        cartona += `
          <div class="col-md-3 ">
            <div  class="item  ingredient rounded-4  overflow-hidden position-relative text-center text-white my-2">
              <i data-ingredient = "${element.strIngredient}" class="fa-solid fa-drumstick-bite display-1"></i>
              <h2 data-ingredient = "${element.strIngredient}"> ${element.strIngredient}  </h2>
              <p data-ingredient = "${element.strIngredient}">  ${element.strDescription} </p>
            </div>
          </div>
          
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventIngredients(allBoxMeals)
    }

    // * Add Event On All Box Meals :
    function addEventIngredients(array){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        $(element).click(function(e){
          checkIngredients(e)
        })
      }
    }

    // * Function Get Ingredients And Get Element Ingredients Of Array :
    async function checkIngredients(e){
      let ingredient = e.target.getAttribute("data-ingredient");
      let responseElementById = await getDataByIngredients(ingredient);

      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(responseElementById).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });


      displayByNameIngredients(responseElementById);
      // console.log("checkIdHome");
      // console.log(responseElementById);
    }

    // * Api get Data Meal by Ingredients
    async function getDataByIngredients(ingredient){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      let result = await api.json();
      let response = result.meals;
      $(".inner-loading").fadeIn(500);
      $(".inner-loading").addClass("d-flex");


      $(response).ready(function () {
        $(".inner-loading").fadeOut(500);
        $(".inner-loading").removeClass("d-flex");
      });


      // console.log(response);
      return response ;
    }

    // * Function Display Data Ingredients :
    function displayByNameIngredients (array){
      let cartona = ``;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        cartona += `
          <div class="col-md-3">
            <div class="item  rounded-4  overflow-hidden position-relative">
              <img src="${element.strMealThumb}" alt="meals" class="w-100 ">
              <div data-id= "${element.idMeal}" class="titleImage position-absolute d-flex align-items-center">
                <h2>${element.strMeal}</h2>
              </div>
            </div>
          </div>
        `
      }
      document.getElementById("rowDataSearch").innerHTML = "";
      document.getElementById("inputSearch").innerHTML = "";
      document.getElementById("rowData").innerHTML = cartona;
      const allBoxMeals = document.querySelectorAll(".col-md-3");
      addEventCategoryById(allBoxMeals)
    }
//& =========================================================================================













//& Function Add Data In Inner HTML Inter The Contact Section:===========================
//^ Function Add Data In Contact Section : 
function addContact(){
    document.getElementById("rowData").innerHTML = `
    <section id="contact"  class="container overflow-hidden  text-white ">
      <div class="row rowInput align-items-center g-4 " id="rowDataSearch ">
        <div class="col-md-1 offset"></div>
        <div class="col-md-5 ">
          <div class="item">
            <input id="nameInput" class="form-control mt-2" type="text" placeholder="Enter Your Name">
            <p id="nameText" class="inputText  "></p>
            <input id="phoneInput" class="form-control mt-2 " type="number" placeholder="Enter Your Phone">
            <p id="phoneText" class="inputText "></p>
            <input id="passwordInput" class="form-control mt-2" type="Password" placeholder="Enter Your Password">
            <p id="passwordText" class="inputText "></p>
          </div>
        </div>

        <div class="col-md-5 ">
          <div class="item">
            <input id="emailInput" class="form-control mt-2" type="email" placeholder="Enter Your Email">
            <p id="emailText" class="inputText"></p>
            <input id="ageInput" class="form-control mt-2" type="number" placeholder="Enter Your age">
            <p id="ageText" class="inputText"></p>
            <input id="confirmPassInput" class="form-control mt-2" type="Password" placeholder="Enter Your Confirm Password">
            <p id="confirmPassText" class="inputText"></p>
          </div>
        </div>

        <div class="col-md-1 offset"></div>
      </div>
      <div class="row" >
        <button id="submitBtn" class="btn btn-outline-danger  d-inline-block m-auto  w-25 mt-4" disabled>Submit</button>
      </div>
    </section>
    `;

  //& ===========Validation Of Form Input===========================================

    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");
    const passwordInput = document.getElementById("passwordInput");
    const emailInput = document.getElementById("emailInput");
    const ageInput = document.getElementById("ageInput");
    const confirmPassInput = document.getElementById("confirmPassInput");
    const submitBtn = document.getElementById("submitBtn");


    //^ Validation Of Form Input
    let flagName = false;
    let flagPhone = false;
    let flagPassword = false;
    let flagEmail = false;
    let flagAge = false;
    let flagConfirmPass = false;

    //^ Input Name :
    nameInput.addEventListener("input",function(){
      if(validationName ()){
        flagName = true;
        // document.getElementById("nameText").classList.remove("bg-danger","text-white");
        // document.getElementById("nameText").innerHTML = ""
        $("#nameText").removeClass("bg-danger","text-white");
        $("#nameText").innerHTML = "";
        
      }else{
        // document.getElementById("nameText").classList.add("bg-danger","text-white");
        // document.getElementById("nameText").innerHTML = "Not Valid Name"
        $("#nameText").addClass("bg-danger","text-white");
        $("#nameText").innerHTML = "Not Valid Name";
        flagName = false;
      }
      checkValidFinish()
    })

    //^ Input PhoneNumber  :
    phoneInput.addEventListener("input" , function(){
      if(validationPhoneNumber ()){
        flagPhone = true;
        // document.getElementById("phoneText").classList.remove("bg-danger","text-white");
        // document.getElementById("phoneText").innerHTML = ""
        $("#phoneText").removeClass("bg-danger","text-white");
        $("#phoneText").innerHTML = "";
      }else{
        // document.getElementById("phoneText").classList.add("bg-danger","text-white");
        // document.getElementById("phoneText").innerHTML = "Not Valid Phone"ك
        $("#phoneText").addClass("bg-danger","text-white");
        $("#phoneText").innerHTML = "Not Valid Phone";
        flagPhone = false;
      }
      checkValidFinish()
    })

    //^ Input Password :
    passwordInput.addEventListener("input" , function(){
      if(validationPassword()){
        flagPassword = true;
        // document.getElementById("passwordText").classList.remove("bg-danger","text-white");
        // document.getElementById("passwordText").innerHTML = "";
        $("#passwordText").removeClass("bg-danger","text-white");
        $("#passwordText").innerHTML = "";
      }else{
        // document.getElementById("passwordText").classList.add("bg-danger","text-white");
        // document.getElementById("passwordText").innerHTML = "Not Valid Password";
        $("#passwordText").addClass("bg-danger","text-white");
        $("#passwordText").innerHTML = "Not Valid Password";
        flagPassword = false;
      }
      checkValidFinish()
    })

    //^ Input Email :
    emailInput.addEventListener("input" , function(){
      if(validationEmail ()){
        flagEmail = true;
        // document.getElementById("emailText").classList.remove("bg-danger","text-white");
        // document.getElementById("emailText").innerHTML = "";
        $("#emailText").removeClass("bg-danger","text-white");
        $("#emailText").innerHTML = "";
      }else{
        // document.getElementById("emailText").classList.add("bg-danger","text-white");
        // document.getElementById("emailText").innerHTML = "Not Valid Email";
        $("#emailText").addClass("bg-danger","text-white");
        $("#emailText").innerHTML = "Not Valid Email";
        flagEmail = false;
      }
      checkValidFinish()
    })

    //^ Input Age :
    ageInput.addEventListener("input" , function(){
      if(validationAge()){
        flagAge = true;
        // document.getElementById("ageText").classList.remove("bg-danger","text-white");
        // document.getElementById("ageText").innerHTML = "";
        $("#ageText").removeClass("bg-danger","text-white");
        $("#ageText").innerHTML = "";
      }else{
        // document.getElementById("ageText").classList.add("bg-danger","text-white");
        // document.getElementById("ageText").innerHTML = "Not Valid Age";
        $("#ageText").addClass("bg-danger","text-white");
        $("#ageText").innerHTML = "Not Valid Age";
        flagAge = false;
      }
      checkValidFinish()
    })

    //^ Input Confirm Password :
    confirmPassInput.addEventListener("input" , function(){
      if(validationPasswordConfirmed()){
        flagConfirmPass = true;
        // document.getElementById("confirmPassText").classList.remove("bg-danger","text-white");
        // document.getElementById("confirmPassText").innerHTML = "";
        $("#confirmPassText").removeClass("bg-danger","text-white");
        $("#confirmPassText").innerHTML = "";
      }else{
        // document.getElementById("confirmPassText").classList.add("bg-danger","text-white");
        // document.getElementById("confirmPassText").innerHTML = "Not Valid Password";
        $("#confirmPassText").addClass("bg-danger","text-white");
        $("#confirmPassText").innerHTML = "Not Valid Password";
        flagConfirmPass = false;
      }
      checkValidFinish()
    })

    function checkValidFinish(){
      if(flagName && flagPhone && flagPassword && flagEmail && flagAge && flagConfirmPass){
      console.log("Enable");
        // submitBtn.removeAttribute("disabled");
        $("#submitBtn").attr("disabled", false); //remove attribute
      }else{
        // submitBtn.setAttribute("disabled", true)
        $("#submitBtn").attr("disabled", true); //add attribute not add Value
      }
    }

    $("#submitBtn").click(function(){
      nameInput.value = ""; 
      phoneInput.value = ""; 
      passwordInput.value = ""; 
      emailInput.value = ""; 
      ageInput.value = ""; 
      confirmPassInput.value = "";
      // submitBtn.setAttribute("disabled", true);
      $("#submitBtn").attr("disabled", true)

    })

    //Todo Function Validation Name the Input Data for registration :
    function validationName ()
    {
      const regexName = /^[A-Z][a-z]{2,15} [A-Z][a-z]{2,15}$/;
      if (regexName.test(nameInput.value) === true)
      {
        return true;
        // return "Not valid Name";
      }
    }

    //Todo Function Validation Email the Input Data for registration :
    function validationEmail ()
    {
      const regexEmail = /^[A_Za-z-\d_\.]{4,20}@(gmail|yahoo|outlook|hotmail)\.[A-Za-z]{2,5}$/i;
      if ( regexEmail.test( emailInput.value ) === true )
      {
        return true;
        // return "Not valid Email";
      }
    }

    //Todo Function Validation Phone Number the Input Data for registration :
    function validationPhoneNumber ()
    {
      const regexEmail = /^(002)?01[0125][0-9]{8}$/i;
      if ( regexEmail.test( phoneInput.value ) === true  )
      {
        return true;
        // return "Not valid Email";
      }
    }

    // //Todo Function Validation Password the Input Data for registration :
    function validationPassword()
    {
      const regexPassword = /^.{4,10}$/;
      if ( regexPassword.test( passwordInput.value ) === true )
      {
        return true;
        // return "Not valid Password";
      }
    }

    // //Todo Function Validation Age the Input Data for registration :
    function validationAge()
    {
      const regexAge = /^([0-9][0-9]?||100)$/gm;
      if ( regexAge.test( ageInput.value ) === true )
      {
        return true;
        // return "Not valid Password";
      }
    }

    // //Todo Function Validation Password Confirmed the Input Data for registration :
    function validationPasswordConfirmed()
    {
      if ( passwordInput.value === confirmPassInput.value )
      {
        return true;
        // return "Not valid Password Confirmed";
      }
    }
}
//& ======================================================================================