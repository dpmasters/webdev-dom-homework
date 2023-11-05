import { renderLogin } from "./loginPage.js";



export function renderReg() {
    const appElement = document.getElementById("app");

    const regHtml = `
    <div class="container">
        <div class="add-form">
        <h3 class="login-name">Форма регистрации</h3>
        <input
            id="name-input"
            type="text"
            class="add-form-name"
            placeholder="Введите имя"
        />
        <br>
        <input
            id="login-input"
            type="text"
            class="add-form-name add-form-name-login"
            placeholder="Введите логин"
        />
        <input
            id="password-input"
            type="textarea"
            class="add-form-text add-form-text-login"
            placeholder="Введите пароль"
        ></input>
        <div class="add-form-row add-form-row-login">
        <button id="register-button" class="add-form-button add-form-button-login">Зарегистрироваться</button>
        </div>
          <div class="enter-form-text">
          <div id="autorization" class="login-link" href="login.html">Войти</div>
          </div>
        </div>
      </div>
    `;

    appElement.innerHTML = regHtml;

    const autoLink = document.getElementById("autorization");

    autoLink.addEventListener("click", () => {
        renderLogin();
    })
    
};