const BASE_URL = "http://localhost:8080";
// const BASE_URL = "http://44.201.179.67:8080";

export default class Http {
  static _urlBuilder(
    baseUrl: string,
    endpoint: string,
    filters?: { [key: string]: string | number }
  ) {
    let url = baseUrl + endpoint + "?";
    for (const key in filters) {
      url = url.concat(`${key}=${filters[key]}&`);
    }

    return url;
  }
  static async get<T>(
    endpoint: string,
    headers: { authorization: string },
    filters?: { [key: string]: string | number }
  ): Promise<Array<T>> {
    const response = await fetch(
      this._urlBuilder(BASE_URL, endpoint, filters),
      {
        method: "GET",
        headers: { authorization: headers.authorization },
      }
    );
    const json = await response.json();
    return json;
  }
  static async delete(
    endpoint: string,
    id: number,
    headers: { authorization: string }
  ): Promise<Response> {
    const response = await fetch(BASE_URL + endpoint + "/" + id, {
      headers: { authorization: headers.authorization },
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  }

  static async put<T>(
    endpoint: string,
    id: number,
    body: T,
    headers: { authorization: string }
  ): Promise<Response> {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: headers.authorization,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json;
  }

  static async post<T>(
    endpoint: string,
    body: T,
    headers: { authorization: string }
  ): Promise<Response> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: headers.authorization,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json;
  }
}
