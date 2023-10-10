import Http from "./Http";

describe("Http", () => {
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
    const result = await Http.get<{ id: number }[]>(endpoint, {
      authorization: "abc",
    });

    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith(BASE_URL + endpoint + "?", {
      method: "GET",
      headers: { authorization: "abc" },
    });

    expect(result).toEqual([{ id: 1 }]);
  });
  test("should call fetch correctly when filters are provided", async () => {
    const BASE_URL = "http://localhost:8080";
    const filters = { filtro1: "abc" };
    window.fetch = jest.fn().mockResolvedValueOnce({ json: () => [{ id: 1 }] });
    const endpoint = "/endpoint";
    const result = await Http.get<{ id: number }[]>(
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
});
