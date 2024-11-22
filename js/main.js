
let userName = document.querySelector("#user-name")
let password = document.querySelector("#password-name")
let alertShow = document.querySelector(".alert-show");
const loginBtn = document.querySelector("#login-btn");
const regitaBtn = document.querySelector("#regita-btn");
const logOut = document.querySelector("#logout-btn");
const userNameAnImage = document.querySelector(".users");
let buttonAdd = document.querySelector(".button-add");
let imageLogin = document.querySelector(".login-image");


let currentPage = 1;

window.addEventListener("scroll", () => {
  const endPage = window.innerHeight + Math.ceil(window.pageYOffset) >=document.body.offsetHeight;
  // console.log(endPage);

  if (endPage) {
    currentPage++;
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts?limit=20&page=${currentPage}`)
      .then((respons) => {
        let theData = respons.data.data;
        cratePosts(theData);
        // console.log(theData)
      });
  }
})



axios
  .get("https://tarmeezacademy.com/api/v1/posts?limit=10")
  .then((respons) => {
    let theData = respons.data.data;
    console.log(theData);
    cratePosts(theData);
  });



function cratePosts(data) {
  for (let i = 0; i < data.length; i++) {

    let div = document.createElement("div")
    div.className = "container mt-5";

    let container = `
    
      <div class="col-9 mx-auto">
        <div class="card">
          <!-- card header -->
          <div class="card-header d-flex align-items-center">
            <img src="${data[i].author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;">
            <p class="mb-0 ms-2" style="font-weight: bold;">@${data[i].author.name}</p>
          </div>
          <!-- Card image and time -->
          <div class=" p-3"> 
            <img class="w-100 h-25" src="${data[i].image}" alt="">
            <p class="m-0" style="color: #666;">${data[i].created_at}</p>
          </div>
          <!-- card bodt -->
          <div class="card-body pt-0">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].body}</p>
          </div>
          <!-- card comment -->
          <div class=" p-2 border border-top-2 ">
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
    div.innerHTML += container;
    document.body.appendChild(div);
  }
}



function createPost() {

  const titlePost = document.querySelector("#title-add").value;
  const bodyPost = document.querySelector("#body-add").value;
  const imagePost = document.querySelector("#image-add").files[0];

  let token = localStorage.getItem("token")

  let formData = new FormData();
  formData.append("title", titlePost);
  formData.append("body", bodyPost);
  formData.append("image", imagePost);

  axios.post("https://tarmeezacademy.com/api/v1/posts", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        "authorization": `Bearer ${token}`,
      },
    })
    .then((respons) => {
      document.querySelector(".btn-close-add").click();
      console.log(respons.data.data);
      
      let data = respons.data.data;
    
      let div = document.createElement("div");
      div.className = "container mt-5";

      let container = `
    
      <div class="col-9 mx-auto">
        <div class="card">
          <!-- card header -->
          <div class="card-header d-flex align-items-center">
            <img src="${data.author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;">
            <p class="mb-0 ms-2" style="font-weight: bold;">@${data.author.name}</p>
          </div>
          <!-- Card image and time -->
          <div class=" p-3"> 
            <img class="w-100 h-25" src="${data.image}" alt="">
            <p class="m-0" style="color: #666;">${data.created_at}</p>
          </div>
          <!-- card bodt -->
          <div class="card-body pt-0">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.body}</p>
          </div>
          <!-- card comment -->
          <div class=" p-2 border border-top-2 ">
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-pen-clip me-1 "></i>
              (${data.comments_count}) comments
            <span class="d-flex m-0 ms-3">
            </span>
          </div>
        </div>
        </div>
      </div>

  `;
      div.innerHTML = container;
      document.body.appendChild(div);
    });

}
