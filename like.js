import { toggleLike } from "./api.js";
import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";

// function likeEventButton({ comments }) {
//     const likeButtons = document.querySelectorAll(".like-button");
//   for (const likeButton of likeButtons) {
//     likeButton.addEventListener("click", (event) => {
//       event.stopPropagation();
//   const index = likeButtons.dataset.index;
//     if (index !== null) {
//       const comment = comments[index];
//       if (!comment.isLiked) {
//         comment.isLiked = true;
//         likeButton.classList.add("active-like");
//         comment.likes++;
//       } else {
//         comment.isLiked = false;
//         comment.likes--;
//       }    
//     renderComments({ comments }); // После обновления лайков перерисовываем комментарии
//       }
//     });  
//   }
// }

export function addLikeEventListeners() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      // const index = likeButtons.dataset.id;
        if (index !== null) {
          const comment = comments[index];
          if (!comment.isLiked) {
            comment.isLiked = true;
            likeButton.classList.add("active-like");
            comment.likes++;
          } else {
            comment.isLiked = false;
            comment.likes--;
          } 
        // renderComments({ comments }); // После обновления лайков перерисовываем комментарии
          }
      console.log(comments[comments.length - 1])
      toggleLike({ id:comments[comments.length - 1].id }).then(() => {
        renderComments();
      })
    });
  });
}
addLikeEventListeners();
