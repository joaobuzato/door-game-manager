function setCookie(name: string, value: string, daysToExpire: number): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  const expires = `expires=${expirationDate.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function eraseCookie(name: string): void {
  setCookie(name, "", -1);
}

export { setCookie, getCookie, eraseCookie };
