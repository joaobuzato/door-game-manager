import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAllItems } from "./doorApiClient";
import { Room } from "../types";
import Http from "../http/Http";
jest.mock("../http/Http");

type ExampleType = {
  everything: string;
  everywhere: number;
  all: { at: string };
  once: number[];
};

const getValues: ExampleType[] = [
  {
    everything: "everything",
    everywhere: 3,
    all: { at: "at" },
    once: [1, 2, 3, 4],
  },
];
describe("Door API Client", () => {
  let getSpy: jest.SpyInstance;
  beforeAll(() => {
    getSpy = jest.spyOn(Http, "get");
    window.alert = jest.fn();
  });
  beforeEach(() => {});
  afterEach(() => {
    getSpy.mockClear();
  });
  test("should getAllItems", async () => {
    getSpy.mockResolvedValue(getValues);
    const result = await getAllItems<ExampleType>("/endpoint");
    expect(Http.get).toBeCalledTimes(1);
    expect(result).toBe(getValues);
  });
  test("should return [] on getAllItems error", async () => {
    getSpy.mockRejectedValueOnce("error");
    const result = await getAllItems<ExampleType>("/endpoint");
    expect(Http.get).toBeCalledTimes(1);
    expect(window.alert).toBeCalledTimes(1);
    expect(result).toEqual([]);
  });
});
