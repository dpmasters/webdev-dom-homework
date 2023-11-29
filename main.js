import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";

//Массив с данными комменатриев
export let comments = [];
// Главная страница
export const getRenderComments = () => {
const appHTML = document.getElementById("app")
  getComments().then((responseData) => {
    comments = responseData.comments.map((comment) => {
      return {
        id: comment.id,
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      }
    });
    // получили данные и рендерим их в приложении
    renderComments({ comments });
  });
};
getRenderComments();


