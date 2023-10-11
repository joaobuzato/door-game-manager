import Http from "./Http";

describe("Http", () => {
  type ExampleType = { id: number };
  test("should build url", () => {
    const filters = {
      filter1: "filtro",
      filter2: "filtro2",
    };
    const endpoint = "/rooms";
    const baseUrl = "http://base.com";

    const url = Http._urlBuilder(baseUrl, endpoint, filters);

    expect(url).toBe(baseUrl + endpoint + "?filter1=filtro&filter2=filtro2&");
  });
  test("should return array when get succesfully", async () => {
    const BASE_URL = "http://localhost:8080";
    window.fetch = jest.fn().mockResolvedValueOnce({ json: () => [{ id: 1 }] });
    const endpoint = "/endpoint";
    const result = await Http.get<ExampleType[]>(endpoint, {
      authorization: "abc",
    });

    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith(BASE_URL + endpoint + "?", {
      method: "GET",
      headers: { authorization: "abc" },
    });

    expect(result).toEqual([{ id: 1 }]);
  });
  test("should call fetch on get correctly when filters are provided", async () => {
    const BASE_URL = "http://localhost:8080";
    const filters = { filtro1: "abc" };
    window.fetch = jest.fn().mockResolvedValueOnce({ json: () => [{ id: 1 }] });
    const endpoint = "/endpoint";
    const result = await Http.get<ExampleType[]>(
      endpoint,
      {
        authorization: "abc",
      },
      filters
    );

    expect(window.fetch).toBeCalledTimes(1);

    expect(window.fetch).toBeCalledWith(BASE_URL + endpoint + "?filtro1=abc&", {
      method: "GET",
      headers: { authorization: "abc" },
    });

    expect(result).toEqual([{ id: 1 }]);
  });
  test("should call fetch on delete correctly", async () => {
    const BASE_URL = "http://localhost:8080";
    const id = 1;
    const endpoint = "/endpoint";
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => {
        return {
          success: true,
          message: "Deletado",
        };
      },
    });

    const result = await Http.delete(endpoint, 1, { authorization: "abc" });

    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith(BASE_URL + endpoint + "/" + id, {
      method: "DELETE",
      headers: { authorization: "abc" },
    });
    expect(result).toEqual({
      success: true,
      message: "Deletado",
    });
  });
  test("should put correctly", async () => {
    const BASE_URL = "http://localhost:8080";
    const id = 1;
    const endpoint = "/endpoint";
    const body = { id: 123 };
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => {
        return {
          success: true,
          message: "Atualizado",
        };
      },
    });

    const result = await Http.put<ExampleType>(endpoint, id, body, {
      authorization: "abc",
    });

    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith(BASE_URL + endpoint + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: "abc" },
      body: JSON.stringify(body),
    });

    expect(result).toEqual({
      success: true,
      message: "Atualizado",
    });
  });

  test("should post correctly", async () => {
    const BASE_URL = "http://localhost:8080";
    const endpoint = "/endpoint";
    const body = { id: 123 };
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 201,
      json: () => {
        return {
          success: true,
          message: "Criado",
        };
      },
    });

    const result = await Http.post<ExampleType>(endpoint, body, {
      authorization: "abc",
    });

    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith(BASE_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: "abc" },
      body: JSON.stringify(body),
    });

    expect(result).toEqual({
      success: true,
      message: "Criado",
    });
  });
});
