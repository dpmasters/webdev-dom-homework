const baseURL = "https://wedev-api.sky.pro/api/v2/dmitriy-panfilov/comments";
const authorizURL = "https://wedev-api.sky.pro/api/user/login";

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
export function postApi({ text, name, date }) {
   return fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
      name: name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        date: date,
        text: text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        Likes: 0,
        isLiked: false,
      }),
      headers: {
         Authorization: `Bearer ${token}`,
       },
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

export function login({ login, password }) {
   return fetch(authorizURL, {
      method: "POST",
      body: JSON.stringify({
      login,
      password,
      }),
   }).then((response) => {
      return response.json();
   });
}