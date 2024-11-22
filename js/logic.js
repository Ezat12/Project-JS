// const { Button } = require("bootstrap");

let userName = document.querySelector("#user-name");
let password = document.querySelector("#password-name");
let alertShow = document.querySelector(".alert-show");
const loginBtn = document.querySelector("#login-btn");
const regitaBtn = document.querySelector("#regita-btn");
const logOut = document.querySelector("#logout-btn");
const userNameAnImage = document.querySelector(".users");
let buttonAdd = document.querySelector(".button-add");
let imageLogin = document.querySelector(".login-image");
let profile = document.querySelector(".the-profile");
console.log(profile)

let theIsId ;

sutUpUrl();

function loginBtnClick() {
  let body = {
    "username": userName.value,
    "password": password.value,
  };

  axios.post("https://tarmeezacademy.com/api/v1/login", body)
    .then((respons) => {
      let token = respons.data.token;

      console.log(respons.data);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(respons.data.user));

      theIsId = respons.data.user.id;

      userName.value = "";
      password.value = "";

      document.querySelector(".btn-close-login").click();

      alertShow.classList.remove("bg-danger");

      alertShow.innerHTML = `<h1 class="text text-light" style="line-height: 100px;">Success Login</h1>`;

      setTimeout(() => {
        alertShow.classList.add("visiable");
        setTimeout(() => {
          alertShow.classList.remove("visiable");
        }, 1000);
      }, 100);

      setTimeout(() => {
        alertShow.classList.add("visiable");
        setTimeout(() => {
          alertShow.classList.remove("visiable");
        }, 1000);
      }, 100);

      sutUpUrl();

      YesOrNo();
    });
  
}

function registerBtnClick() {
  const theName = document.querySelector("#register-name").value;
  const theUserName = document.querySelector("#register-username").value;
  const thePassword = document.querySelector("#register-password").value;
  const TheImage = document.querySelector("#register-image").files[0];

  let fromData = new FormData();
  fromData.append("name", theName);
  fromData.append("username", theUserName);
  fromData.append("password", thePassword);
  fromData.append("image", TheImage);

  axios
    .post("https://tarmeezacademy.com/api/v1/register", fromData)
    .then((respons) => {
      let token = respons.data.token;
      console.log(respons.data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(respons.data.user));

      theName.value = "";
      theUserName.value = "";
      thePassword.value = "";
      document.querySelector(".btn-close-register").click();

      alertShow.classList.remove("bg-danger");

      alertShow.innerHTML = `<h1 class="text text-light" style="line-height: 100px;">Success Register</h1>`;

      setTimeout(() => {
        alertShow.classList.add("visiable");
        setTimeout(() => {
          alertShow.classList.remove("visiable");
        }, 1000);
      }, 100);

      setTimeout(() => {
        alertShow.classList.add("visiable");
        setTimeout(() => {
          alertShow.classList.remove("visiable");
        }, 1000);
      }, 100);

      sutUpUrl();

      YesOrNo();
    });
  // .catch(() => {
  //   alert("The username has already been taken");
  // });
}

function logout() {
  localStorage.removeItem("name");
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  loginBtn.style.display = "Block";
  regitaBtn.style.display = "Block";
  logOut.style.display = "none";
  
  if (buttonAdd != null) {
    buttonAdd.style.display = "block";
  }

  alertShow.classList.add("bg-danger");

  alertShow.innerHTML = `<h1 class="text text-light" style="line-height: 100px;">Success Logout</h1>`;
  
  setTimeout(() => {
    alertShow.classList.add("visiable");
    setTimeout(() => {
      alertShow.classList.remove("visiable");
    }, 1000);
  }, 100);

  let user = getUser();
  
  document.querySelector(".login-name").innerHTML = "null User";
  imageLogin.style.display = "none";

  YesOrNo();
  location.reload();
}

function sutUpUrl() {
  const getToken = localStorage.getItem("token");

  if (getToken != null) {
    if (loginBtn != null) {
      loginBtn.style.display = "none";
    }

    if (regitaBtn != null) {

      regitaBtn.style.display = "none";
    }

    if (logOut != null) {
      logOut.style.display = "block";
    }


    if (buttonAdd != null) {
      buttonAdd.style.display = "block";
    }

    let user = getUser();

    document.querySelector(".login-name").innerHTML = user.username;
    imageLogin.style.display = "inline";

    imageLogin.setAttribute("src", user.profile_image);
  }
}

function getUser() {
  let user = localStorage.getItem("user");

  if (user != null) {
    user = JSON.parse(user);
  }
  return user;
}


function cratePosts(data) {
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.className = "container mt-5";

    // console.log(data[i]);

    let button = ``;
    
    let user = getUser();
    let isMyPost = user != null && data[i].author.id == user.id;

    if (isMyPost) {
      button = `<button type="button" class="btn btn-secondary text-end" onclick ="editClickPost('${encodeURIComponent(
        JSON.stringify(data[i])
      )}')">Edit</button>`;
    };

    let container = `
    
      <div class="col-9 mx-auto">
        <div class="card " data-id = "${data[i].id}">
          <!-- card header -->
          <div class="card-header d-flex align-items-center justify-content-between">
            <div class = "d-flex align-items-center" onclick = "postClick(${data[i].id})">
              <img src="${data[i].author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;">
              <p class="mb-0 ms-2" style="font-weight: bold;">@${data[i].author.name}</p>
            </div>
            <div>${button}</div>
          </div>
          <!-- Card image and time -->
          <div class=" p-3 onclick = "postClick(${data[i].id})""> 
            <img class="w-100 h-25" src="${data[i].image}" alt="">
            <p class="m-0" style="color: #666;">${data[i].created_at}</p>
          </div>
          <!-- card bodt -->
          <div class="card-body pt-0" onclick = "postClick(${data[i].id})">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].body}</p>
          </div>
          <!-- card comment -->
          <div class=" p-2 border border-top-2" onclick = "postClick(${data[i].id})">
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-pen-clip me-1 "></i>
              (${data[i].comments_count}) comments
            <span class="d-flex m-0 ms-3">
            </span>
          </div>
        </div>
        </div>
      </div>

  `;
    
    // if()
    
    div.innerHTML += container;
    document.body.appendChild(div);
  }
}

function postClick(id) {
  location = `main_logic.html?postId=${id}`
}

function YesOrNo() {
  if (localStorage.getItem("token")) {
    if (document.querySelector(".form-input")) {
      document.querySelector(".form-input").style.display = "block";
    }
  }
  else {
    if (document.querySelector(".form-input")) {
      document.querySelector(".form-input").style.display = "none";
    }
  }
}

let getValue = document.querySelector("#get-value");


function editClickPost(postObject) {

  let post = JSON.parse(decodeURIComponent(postObject));

  console.log(post.id);
  let postModel = new bootstrap.Modal(document.querySelector("#add-model"));

  document.querySelector("#post-model-title").innerHTML = "Edit Post";

  document.querySelector("#title-add").value = post.title;
  document.querySelector("#body-add").value = post.body;

  getValue.value = "false";

  getValue.setAttribute("data-id" , post.id) ;
  // console.log(getValue.getAttribute("data-id"));

  postModel.toggle();


  
}

profile.addEventListener("click", (theProfile) => {
  
  if (localStorage.getItem("token")) {
    theProfile.target.setAttribute("href", "profile.html");
    console.log(theProfile.target.getAttribute("href"));
  }
  else {
    
  }

})