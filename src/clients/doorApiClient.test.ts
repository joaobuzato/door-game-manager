import { deleteItem, editItem, getAllItems, saveItem } from "./doorApiClient";
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
  let putSpy: jest.SpyInstance;
  let postSpy: jest.SpyInstance;
  let deleteSpy: jest.SpyInstance;

  const onSuccessCallback = jest.fn();
  const onErrorCallback = jest.fn();
  beforeAll(() => {
    getSpy = jest.spyOn(Http, "get");
    putSpy = jest.spyOn(Http, "put");
    postSpy = jest.spyOn(Http, "post");
    deleteSpy = jest.spyOn(Http, "delete");
  });
  beforeEach(() => {
    window.alert = jest.fn();
  });
  afterEach(() => {
    putSpy.mockClear();
    getSpy.mockClear();
    postSpy.mockClear();
    deleteSpy.mockClear();
    onErrorCallback.mockClear();
    onSuccessCallback.mockClear();
  });
  test("should getAllItems", async () => {
    getSpy.mockResolvedValue(getValues);
    const result = await getAllItems<ExampleType>("/endpoint");
    expect(getSpy).toBeCalledTimes(1);
    expect(result).toBe(getValues);
  });
  test("should return [] on getAllItems error", async () => {
    getSpy.mockRejectedValueOnce("error");
    const result = await getAllItems<ExampleType>("/endpoint");
    expect(getSpy).toBeCalledTimes(1);
    expect(window.alert).toBeCalledTimes(1);
    expect(result).toEqual([]);
  });
  test("should alert on put error", async () => {
    putSpy.mockRejectedValueOnce("error");
    await editItem("/endpoint", 1, {}, onSuccessCallback, onErrorCallback);
    expect(putSpy).toBeCalledTimes(1);
    expect(window.alert).toBeCalledTimes(1);
  });
  test("should call onErrorCallback with message on put error 403", async () => {
    const response = { status: 403 };

    putSpy.mockResolvedValueOnce(response);
    await editItem("/endpoint", 1, {}, onSuccessCallback, onErrorCallback);
    expect(putSpy).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledWith(response);
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("faça o login novamente.");
  });
  test("should call onErrorCallback with message on put error > 300", async () => {
    const response = { status: 401 };

    putSpy.mockResolvedValueOnce(response);
    await editItem("/endpoint", 1, {}, onSuccessCallback, onErrorCallback);
    expect(putSpy).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledWith(response);
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("Alguma coisa deu errada ao salvar.");
  });
  test("should edit successfully", async () => {
    const response = { status: 200 };

    putSpy.mockResolvedValueOnce(response);
    await editItem("/endpoint", 1, {}, onSuccessCallback, onErrorCallback);
    expect(putSpy).toBeCalledTimes(1);
    expect(onSuccessCallback).toBeCalledTimes(1);
    expect(onSuccessCallback).toBeCalledWith(response);
    expect(window.alert).toBeCalledTimes(0);
  });
  test("should alert on post error", async () => {
    postSpy.mockRejectedValueOnce("error");
    await saveItem("/endpoint", {}, onSuccessCallback, onErrorCallback);
    expect(postSpy).toBeCalledTimes(1);
    expect(window.alert).toBeCalledTimes(1);
  });
  test("should call onErrorCallback with message on post error 403", async () => {
    const response = { status: 403 };

    postSpy.mockResolvedValueOnce(response);
    await saveItem("/endpoint", {}, onSuccessCallback, onErrorCallback);
    expect(postSpy).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledWith(response);
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("faça o login novamente.");
  });
  test("should call onErrorCallback with message on post error > 300", async () => {
    const response = { status: 401 };

    postSpy.mockResolvedValueOnce(response);
    await saveItem("/endpoint", {}, onSuccessCallback, onErrorCallback);
    expect(postSpy).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledTimes(1);
    expect(onErrorCallback).toBeCalledWith(response);
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("Alguma coisa deu errada ao salvar.");
  });
  test("should save successfully", async () => {
    const response = { status: 200 };

    postSpy.mockResolvedValueOnce(response);
    await saveItem("/endpoint", {}, onSuccessCallback, onErrorCallback);
    expect(postSpy).toBeCalledTimes(1);
    expect(onSuccessCallback).toBeCalledTimes(1);
    expect(onSuccessCallback).toBeCalledWith(response);
    expect(window.alert).toBeCalledTimes(0);
  });
  test("should alert on delete error", async () => {
    deleteSpy.mockRejectedValueOnce("error");
    const result = await deleteItem("/endpoint", 1);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(window.alert).toBeCalledTimes(1);
    expect(result).toBe(false);
  });
  test("should return false on error 403", async () => {
    const response = { status: 403 };

    deleteSpy.mockResolvedValueOnce(response);
    await deleteItem("/endpoint", 1);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("faça o login novamente.");
  });
  test("should return false on DELETE error > 300", async () => {
    const response = { status: 401 };

    deleteSpy.mockResolvedValueOnce(response);
    const result = await deleteItem("/endpoint", 1);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(result).toBe(false);
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("Alguma coisa deu errada ao salvar.");
  });
  test("should delete successfully", async () => {
    const response = { status: 200 };

    deleteSpy.mockResolvedValueOnce(response);
    const result = await deleteItem("/endpoint", 1);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(result).toBe(true);
    expect(window.alert).toBeCalledTimes(0);
  });
});
