const baseURL = "https://wedev-api.sky.pro/api/v2/dmitrii-panfilov/comments";
const deleteURL = "https://wedev-api.sky.pro/api/v2/dmitriy-panfilov/comments/:id"
const authorizURL = "https://wedev-api.sky.pro/api/user/login";
const regURL = "https://wedev-api.sky.pro/api/user";

export let userName;
export const setUserName = (newUserName) => {
  userName = newUserName;
};

export let token;
export const setToken = (newToken) => {
   token = newToken;
};

export function getComments() {
    return fetch(baseURL, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
       },
    }).then((response) => {
      if (response.status === 401) {
         token = prompt('Введите верный пароль');
         getComments();
         throw new Error('Вы не авторизованы');
       }
       return response.json();
     });
}
//передаем текст, дату в качестве аргумента
export function postApi({ text }) {
   return fetch(baseURL, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify({
         
        text: text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),

      }),
      
      })
      .then((response) => {
          console.log(response);
          if (response.status === 500) {
             throw new Error("Сервер сломался");
          }
          if (response.status === 400) {
             throw new Error("Плохой запрос");
          }
          else {
          return response.json();
          }
        });
}

export function deleteComment({ index }) {
   return fetch("https://wedev-api.sky.pro/api/v2/dmitriy-panfilov/comments/" + id, {
      method: "DELETE",
      headers: {
         Authorization: `Bearer ${token}`,
       },
       id,
      }).then((response) => {
          console.log(response);
          if (response.status === 500) {
             throw new Error("Сервер сломался");
          } else {
          return response.json();
          }
        });
}

export function login({ login, password }) {
   return fetch(authorizURL, {
      method: "POST",
      body: JSON.stringify({
      login,
      password,
      }),
   }).then((response) => {
      console.log(response)
      if (response.status === 400) {
         throw new Error("Неправильный логин или пароль");
      } else {
         return response.json();
      }
   });
};

export function registration({ login, name, password }) {
   return fetch(regURL, {
      method: "POST",
      body: JSON.stringify({
      login,
      name,
      password,
      }),
   }).then((response) => {
      console.log(response)
      if (response.status === 400) {
         throw new Error("Данный логин уже занят");
      } else {
         return response.json();
      }
   });
};
