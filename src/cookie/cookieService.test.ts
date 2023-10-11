import { getCookie, setCookie, eraseCookie } from "./cookieService";

describe("cookieService", () => {
  test("should set, get and erase the cookie correctly", () => {
    const name = "name";
    const value = "value";
    const daysToExpire = 1;

    setCookie(name, value, daysToExpire);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    expect(document.cookie).toBe(`${name}=${value}`);

    const cookieString = getCookie(name);

    expect(cookieString).toBe(value);

    eraseCookie(name);

    expect(document.cookie).toBe("");
    expect(getCookie(name)).toEqual(null);
  });
});
