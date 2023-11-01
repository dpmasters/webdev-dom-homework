import { likeEventButton } from "./like.js";

const addComment = document.getElementById("list");
const textInput = document.getElementById("text-input");


export const renderComments = ({ comments, getRenderComments }) => {
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
    <ul id="comment-list" class="comments">${commentsHtml}
    </ul>
    <div class="loading-comment">Комментарии загружаются...</div>
    <div class="login-alert">Чтобы добавить комментарий, <a id="authorization" href="login.html"> авторизуйтесь</a></div>
    <div class="add-form id="add">
      <input id="name-input"
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea id="comment-input"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>
  </div>`

  appElement.innerHTML = appHtml;

  const authoriz = document.getElementById("authorization");
  authoriz.addEventListener("click", () =>{
    renderLogin();
  })
  

 
    const textInput = document.getElementById("text-input");
   
    addComment.innerHTML = commentsHtml;
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