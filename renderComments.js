import { postApi, setUserName, userName } from "./api.js";
import { likeEventButton } from "./like.js";
import { renderLogin } from "./loginPage.js";
import { formatedDate } from "./main.js";





export const renderComments = ({ comments }) => {
  const appElement = document.getElementById("app");
    const commentsHtml = comments
    .map((comment, index) => {
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
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            <span class="likes-counter">${comment.likes}</span>
          </div>
        </div>
      </li>`;
    }).join('');

    const appHtml = `
  <div class="container">
    <div id="loader-comment">Комментарии загружаются...</div>
    <ul id="list" class="comments">${commentsHtml}</ul>
    <div id="add-loader-comment">Комментарий добавляется...</div>
    <div class="login-alert">Чтобы добавить комментарий, <a id="authorization" href="#">авторизуйтесь</a></div>
    <div class="add-form" id="add-form">
      <input id="name-input" type="text" class="add-form-name" placeholder=${userName} />
      <textarea id="text-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button id="comment-button" class="add-form-button">Написать</button>
      </div>
    </div>
  </div>
  `;

  appElement.innerHTML = appHtml;

  const loaderComment = document.getElementById("loader-comment");
  loaderComment.style.display = 'none';



  const authoriz = document.getElementById("authorization");
  authoriz.addEventListener("click", () =>{
    renderLogin();
  })
  
  const addCommentButton = document.getElementById("comment-button");
  const nameInput = document.getElementById("name-input");
  const textInput = document.getElementById("text-input");
  const addLoaderComment = document.getElementById('add-loader-comment');
// const addComment = document.getElementById("list");


  document.getElementById("add-loader-comment").style.display = 'none';

  addCommentButton.addEventListener("click", () => {

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

    //Убираем форму ввода при клике кнопку Написать
    document.getElementById("add-form").style.display = 'none';
    addLoaderComment.style.display = true;
    document.getElementById("add-loader-comment").style.display = 'block';
    
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
      document.getElementById("add-form").style.display = 'flex';
      document.getElementById("add-loader-comment").style.display = 'none';
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
    renderComments({ comments });  
  });

 
   
    // addComment.innerHTML = commentsHtml;
    const styleQuote = document.querySelector(".quote");
  const commentsElements = document.querySelectorAll(".comment-text");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      if (index !== null) {
        const comment = comments[index];
        textInput.value = `> ${comment.text} \n ${comment.name}.,`;
      renderComments({ comments, getRenderComments });
      comment.text.replace("<div class='quote'</div>");
      }
    });
  }

  likeEventButton({ comments });
};