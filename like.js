import { toggleLike, token } from "./api.js";
import { comments, getRenderComments } from "./main.js";

export function addLikeEventListeners() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      // if (!token) return
      event.stopPropagation();
      toggleLike({ id:comments[index].id }).then(() => {
        getRenderComments();
      })
    });
  });
}
addLikeEventListeners();
