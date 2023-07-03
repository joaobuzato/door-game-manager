//const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://44.201.179.67:8080";

export default class Http {
  static async get<T>(endpoint: string, options: {}): Promise<Array<T>> {
    const response = await fetch(BASE_URL + endpoint);
    const json = await response.json();
    return json;
  }
  static async delete(endpoint: string, id: number): Promise<Response> {
    const response = await fetch(BASE_URL + endpoint + "/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  }

  static async put<T>(
    endpoint: string,
    id: number,
    body: T
  ): Promise<Response> {
    console.log(body);
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  }

  static async post<T>(endpoint: string, body: T): Promise<Response> {
    console.log(body);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  }
}
