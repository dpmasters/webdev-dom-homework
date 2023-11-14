import { registration, setToken, setUserName, token } from "./api.js";
import { renderLogin } from "./loginPage.js";
import { getRenderComments } from "./main.js";
import { renderComments } from "./renderComments.js";



export const renderReg = () => {
    const appElement = document.getElementById("app");

    const regHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="login-name">Форма регистрации</h3>
            <input id="name-input" type="text" class="add-form-name reg-form-name" placeholder="Введите имя"/>
            <input id="login-input" type="text" class="add-form-name reg-form-login" placeholder="Введите логин"/>
            <textarea id="password-input" type="textarea" class="add-form-text reg-form-password" placeholder="Введите пароль" rows="4"></textarea>
          <div class="add-form-row add-form-row-login">
            <button id="register-button" class="add-form-button add-form-button-login">Зарегистрироваться</button>
          </div>
          <div class="enter-form-text">
            <div id="autorization" class="login-link" href="#">Войти</div>
          </div>
        </div>
    </div>`;

    appElement.innerHTML = regHtml;

    const autoLink = document.getElementById("autorization");
    autoLink.addEventListener("click", () => {
        renderLogin();
    });

    const nameInput = document.querySelector(".reg-form-name");
    const loginInputElement = document.querySelector(".reg-form-login");
    const passwordInputElement = document.querySelector(".reg-form-password");

    const regButtonElement = document.getElementById("register-button");

    regButtonElement.addEventListener("click", () => {
        registration({
            name: nameInput.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
        }).then(() => {
        getRenderComments ();

        })
    });
};