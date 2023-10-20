import { likeEventButton } from "./like.js";

const addComment = document.getElementById("list");
const textInput = document.getElementById("text-input");


export const renderComments = ({ comments }) => {
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
    
    addComment.innerHTML = commentsHtml;
    const styleQuote = document.querySelector(".quote");
  const commentsElements = document.querySelectorAll(".comment-text");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      if (index !== null) {
        const comment = comments[index];
        textInput.value = `> ${comment.text} \n ${comment.name}.,`;
      renderComments({ comments });
      comment.text.replace("<div class='quote'</div>");
      }
    });
  }

  likeEventButton({ comments });
  };