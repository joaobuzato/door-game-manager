import Http from "./Http";

describe("Http", () => {
  test("should build url", () => {
    const filters = {
      filter1: "filtro",
      filter2: "filtro2",
    };
    const baseUrl = "http://base.com";

    const url = Http._urlBuilder(baseUrl, filters);

    expect(url).toBe(baseUrl + "?filter1=filtro&filter2=filtro2&");
  });
});
