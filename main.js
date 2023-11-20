import { getComments } from "./api.js";
// import { renderLogin } from "./loginPage.js";
import { renderComments } from "./renderComments.js";

// const loaderComment = document.getElementById("loader-comment");

const newDate = new Date;
export const formatedDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;

const date = ({ apiDate }) => {
  return new Date(apiDate).toLocaleDateString() + " "
    + (new Date(apiDate).getHours() < 10 ? '0' + new Date(apiDate).getHours() : new Date(apiDate).getHours()) + ":"
    + (new Date(apiDate).getMinutes() < 10 ? '0' + new Date(apiDate).getMinutes() : new Date(apiDate).getMinutes()) + ":"
    + (new Date(apiDate).getSeconds() < 10 ? '0' + new Date(apiDate).getSeconds() : new Date(apiDate).getSeconds())
}
//Убирает лоадер коммент загрузки
// function showLoaderComment() {
//   const showLoaderComment = document.querySelector(".loader-comment");
//   showLoaderComment.classList.remove("hidden");
// }

// function hideLoaderComment() {
//   const hideLoaderComment = document.querySelector(".loader-comment");
//   hideLoaderComment.classList.add("hidden"); 
// }

//Массив с данными комменатриев
export let comments = [];
// Главная страница
export const getRenderComments = () => {
const appHTML = document.getElementById("app")
  // appHTML.innerHTML = "Комментарии загружаются..."
  getComments().then((responseData) => {
    comments = responseData.comments.map((comment) => {
      const apiDate = comment.date;
      return {
        id: comment.id,
        name: comment.author.name,
        date: date({ apiDate }),
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


