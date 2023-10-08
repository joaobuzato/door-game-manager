import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAllItems } from "./doorApiClient";
import { Room } from "../types";
import Http from "../http/Http";
jest.mock("../http/Http");

const getValues = [
  {
    id: 17,
    title: "dfgsdgsf",
    text: "dfgdfg",
    path: "dfg",
    actions: [],
    extendedTexts: [],
    doors: [],
  },
];
describe("Door API Client", () => {
  let getSpy: jest.SpyInstance;
  beforeAll(() => {
    getSpy = jest.spyOn(Http, "get");
  });
  beforeEach(() => {
    getSpy.mockResolvedValue(getValues);
  });
  afterEach(() => {
    getSpy.mockClear();
  });
  test("should getAllItems", async () => {
    const result = await getAllItems<Room>("/rooms");
    expect(Http.get).toBeCalledTimes(1);
    expect(result).toBe(getValues);
  });
});
