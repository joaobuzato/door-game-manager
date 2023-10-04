import { getCookie } from "../cookie/cookieService";
import Http from "../http/Http";

async function getAllItems<T>(
  endpoint: string,
  filters?: { [key: string]: string }
) {
  return Http.get<T>(endpoint, {
    authorization: getCookie("door_game_token") ?? "",
    ...filters,
  })
    .then((response: T[]) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      alert("erro ao obter.");
      return [];
    });
}

const editItem = async (
  endpoint: string,
  entityId: number,
  body: {},
  onSuccessCallback: Function,
  onErrorCallback: Function
) => {
  return Http.put(endpoint, entityId, body, {
    authorization: getCookie("door_game_token") ?? "",
  })
    .then((response) => {
      if (response.status === 403) {
        alert("faça o login novamente.");
        onErrorCallback(response);
      }
      if (response.status > 300) {
        alert("Alguma coisa deu errada ao salvar.");
        onErrorCallback(response);
        return;
      }
      onSuccessCallback(response);
    })
    .catch((error) => {
      alert("Alguma coisa deu errado.");
    });
};

const saveItem = async (
  endpoint: string,
  body: {},
  onSuccessCallback: Function,
  onErrorCallback: Function
) => {
  return Http.post(endpoint, body, {
    authorization: getCookie("door_game_token") ?? "",
  })
    .then((response) => {
      if (response.status === 403) {
        onErrorCallback(response);
        return false;
      }
      if (response.status > 300) {
        onErrorCallback(response);
        return false;
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
      if (response.status > 300) {
        alert("Deu ruim");
        return false;
      }
      return true;
    })
    .catch(() => {
      alert("Deu Ruim ):");
      return false;
    });
};

export { getAllItems, editItem, saveItem, deleteItem };
