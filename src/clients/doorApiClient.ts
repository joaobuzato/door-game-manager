import { getCookie } from "../cookie/cookieService";
import Http from "../http/Http";
import { Room } from "../types";

const getAll = async (endpoint: string) => {
  const responseRooms = await Http.get<Room>(endpoint, {
    authorization: getCookie("door_game_token") ?? "",
  });
  return responseRooms;
};

const edit = async (
  endpoint: string,
  entityId: number,
  body: {},
  onSuccessCallback: Function
) => {
  return Http.put(endpoint, entityId, body, {
    authorization: getCookie("door_game_token") ?? "",
  })
    .then((response) => {
      if (response.status === 403) {
        alert("faça o login novamente.");
        return;
      }
      if (response.status > 300) {
        alert("Alguma coisa deu errada ao salvar.");
      }
      onSuccessCallback(response);
    })
    .catch((error) => {
      alert("Alguma coisa deu errado.");
    });
};

const save = async (
  endpoint: string,
  body: {},
  onSuccessCallback: Function
) => {
  return Http.post(endpoint, body, {
    authorization: getCookie("door_game_token") ?? "",
  })
    .then((response) => {
      if (response.status === 403) {
        alert("faça o login novamente.");
        return;
      }
      if (response.status > 300) {
        alert("Alguma coisa deu errada ao salvar.");
      }
      onSuccessCallback(response);
    })
    .catch((error) => {
      alert("Alguma coisa deu errado.");
    });
};

const deleteItem = async (endpoint: string, id: number) => {
  return Http.delete(endpoint, id, {
    authorization: getCookie("door_game_token") ?? "",
  })
    .then((response) => {
      if (response.status > 300) return alert("Deu ruim");
    })
    .catch(() => {
      alert("Deu Ruim ):");
    });
};

export { getAll, edit, save, deleteItem };
