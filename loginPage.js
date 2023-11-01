import { login, setToken, token } from "./api.js"
import { getRenderComments } from "./main.js";
import { renderReg } from "./renderReg.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div class="add-form">
      <h3 class="login-name">Форма входа</h3>
        <input id="login-input"
          type="text"
          class="add-form-name add-form-name-login"
          placeholder="Введите логин"
        />
        <textarea id="password-input"
          type="textarea"
          class="add-form-text add-form-text-login"
          placeholder="Введите пароль"Н
          rows="4"
          ></textarea>
        <div class="add-form-row add-form-row-login">
          <button id="login-button" class="add-form-button add-form-button-login">Войти</button>
        </div>
        <div class="login-link">
          <div id="registration" class="login-link" href="regist.html">Зарегистрироваться</div>
        </div>
      </div>
  </div>
  `;

  appElement.innerHTML = loginHtml;

  regLink.addEventListener("click", () => {
    renderReg();
})

  

const buttonElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");
const regLink = document.getElementById("registration");


buttonElement.addEventListener("click", () => {
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        console.log(token);
        setToken(responseData.user.token);
        setUserName(responseData.user.name);
        console.log(userName);
    }).then(() => {
        getRenderComments();
    })
});



};