import { useState } from "react";

const setCookie = (cookieName, cookieValue) => {
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
};

const getCookie = (cookieName) => {
  cookieName += "=";
  let cookies = document.cookie.split(";");
  let cookieValue;

  cookies.forEach((cookie) => {
    cookie = cookie.trim();
    if (cookie.indexOf(cookieName) >= 0)
      cookieValue = cookie.substring(cookieName.length);
  });

  return cookieValue;
};

export default function useCookie(cookieName) {
  const [value, setValue] = useState(getCookie(cookieName) || "");
  const set = (newValue) => {
    setCookie(cookieName, newValue);
    setValue(newValue);
  };
  return [value, set];
}
