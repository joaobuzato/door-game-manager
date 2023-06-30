// import dotenv from "dotenv";

// dotenv.config();

const BASE_URL = "http://44.201.179.67:8080";

export default class Http {
  static async get<T>(url: string, options: {}): Promise<Array<T>> {
    const response = await fetch(BASE_URL + url);
    const json = await response.json();
    return json;
  }
  static async delete(url: string, id: number): Promise<Response> {
    const response = await fetch(BASE_URL + url + "/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  }
}
