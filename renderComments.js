import { deleteComment, postApi, token, userName } from "./api.js";
import { addLikeEventListeners } from "./like.js";
import { renderLogin } from "./loginPage.js";
import { formatedDate, getRenderComments } from "./main.js";

export const renderComments = ({ comments }) => {
  const appHTML = document.getElementById("app");
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body"> 
          <div class="comment-text" data-index="${index}">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <button class="like-button ${comment.isLiked ? 'active-like' : ''}" data-index="${index}"></button>
            <span class="likes-counter">${comment.likes}</span>
          </div>
        </div>
      </li>`;
  }).join('');

  appHTML.innerHTML = `
  <div id="loader-comment" class="loader-comment hidden">Комментарии загружаются...</div>
    <ul id="list" class="comments">
    ${commentsHtml}
    </ul>
  ${!token ? `
  <div class="login-alert" id="login-alert">Чтобы добавить комментарий, <a id="authorization" href="#">авторизуйтесь</a></div>
  ` :
      `  <ul id="list" class="comments"></ul>
  <div id="add-loader-comment" class="add-loader-comment">Комментарий добавляется...</div>
  <div class="add-form" id="add-form">
    <input id="name-input" type="text" class="add-form-name" disabled value=${userName} />
    <textarea id="text-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
    <div class="add-form-row">
    <button id="comment-button" class="add-form-button">Написать</button>
    <button id="${comments}" class="delete-form-button">Удалить</button>
    </div>`}
  `

  if(token) {
    document.getElementById("add-loader-comment").style.display = 'none';
  }

  if (!token) {
    const loginLink = document.getElementById("authorization");
    loginLink.addEventListener("click", () => {
      renderLogin();
    })
  };

  const addComment = document.getElementById("list");


// убирает строку комент добавляется, если расскоментировать не добавляется новый коммент и форма нового коммента
  //   document.getElementById("add-loader-comment").style.display = 'none';


  // Добавляем новый комментарий
function addCommentForm () {
  if (!token) return
  const addCommentButton = document.getElementById("comment-button");
  const nameInput = document.getElementById("name-input");
  const textInput = document.getElementById("text-input");
  const addLoaderComment = document.getElementById('add-loader-comment');


// addLoaderComment.style.display = true; // ??? проверить логику

  addCommentButton.addEventListener("click", () => {

    //Убираем форму ввода при клике кнопку Написать
  document.getElementById("add-form").style.display = 'none';
  document.getElementById("add-loader-comment").style.display = 'block';

  const plusLoaderComment = document.querySelector(".add-loader-comment");


    nameInput.classList.remove("error");
    textInput.classList.remove("error");
    if (nameInput.value === "") {
      nameInput.classList.add("error");
      return;
    }
    if (textInput.value === "") {
      textInput.classList.add("error");
      return;
    }
    plusLoaderComment.classList.add("hidden");

    // Создание нового комментария
    function postTask() {
      postApi({
        text: textInput.value,
        name: nameInput.value,
        date: formatedDate
      }).then(() => {
        return getRenderComments({ comments });
      })
        .then(() => {
          getRenderComments({ comments });
          document.getElementById("add-form").style.display = 'flex';
          document.getElementById("add-loader-comment").style.display = 'none';
          // plusLoaderComment.classList.remove("hidden");
          nameInput.value = ""
          textInput.value = ""
        })
        .catch((error) => {
          document.getElementById("add-form").style.display = 'flex';
          document.getElementById("add-loader-comment").style.display = 'none';
          if (error.message === "Сервер сломался") {
            alert('Сервер сломался, попробуйте позже');
          }
          if (error.message === "Плохой запрос") {
            alert('Имя и комментарий должны быть не короче 3х символов');
          }
          else {
            alert("Кажется у вас сломался интернет, попробуйте позже")
          }
          // TODO: Отправлять в систему сбора ошибок
          console.log(error);
        });
    }
    postTask();
  });
}
  // Удаление последненго комментария
  function deleteCommentForm() {
    if (!token) return
    const deleteButtonElement = document.querySelector(".delete-form-button");
    deleteButtonElement.addEventListener("click", () => {
      console.log(comments[comments.length - 1])
      deleteComment({ id:comments[comments.length - 1].id }).then(() => {
       getRenderComments({ comments });
      })
    });
  }
  deleteCommentForm();
addCommentForm();


  addComment.innerHTML = commentsHtml;
// Ответ на комментарий
function replayComment () {
  const textInput = document.getElementById("text-input");
  const commentsElements = document.querySelectorAll(".comment-text");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      if (index !== null) {
        const comment = comments[index];
        textInput.value = `> ${comment.text}:\n ${comment.name}.,`;
      }
    });
  }
}
replayComment();
addLikeEventListeners({ comments });
};