import { getCookie } from "../cookie/cookieService";
import Http from "../http/Http";
import { Room } from "../types";

const getAllRooms = async () => {
  const responseRooms = await Http.get<Room>("/rooms", {
    authorization: getCookie("door_game_token") ?? "",
  });
  return responseRooms;
};

export { getAllRooms };
