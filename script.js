const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const nameValue = document.getElementById("name-value");
const emailValue = document.getElementById("email-value");
const btnSubmit = document.querySelector(".btn");
let output = "";

const renderPosts = (posts) => {
  posts.forEach((post) => {
    output += `
      <div class="card mt-4 col-md-6 bg-ligt">
        <div class="card-body">
          <h5 class="card-title">${post.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.email}</h6>
          <p class="card-text">
            ${post.cpf}
          </p>
          <a href="#" class="btn btn-primary" id="edit-post">Editar</a>
          <a href="#" class="btn btn-danger" id="delete-post">Remover</a>
        </div>
      </div>
      `;
  });
  postsList.innerHTML = output;
};

const url = "https://jsonplaceholder.typicode.com/users";

// Método: Get
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));

postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";

  let id = e.target.parentElement.dataset.id;

  // Método: Delete

  if (delButtonIsPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }

  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    let nameContent = parent.querySelector(".card-title").textContent;
    let emailContent = parent.querySelector(".card-text").textContent;

    nameValue.value = nameContent;
    emailValue.value = emailContent;
  }

  // Método: Patch (O mesmo que o método put, porém ele atualiza apenas o que foi passado no body)

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue.value,
        email: emailValue.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
});

// Método: Post
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(nameValue.value);
  console.log(emailValue.value);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue.value,
      email: emailValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    });
});
