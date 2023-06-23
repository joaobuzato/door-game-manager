import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Door } from "../../types";

export default function ListDoor(props: { changePage: Function }) {
  const [doors, setDoors] = useState(Array<Door>);

  useEffect(() => {
    Http.get<Door>("/doors", {}).then((responseDoors) => {
      setDoors(responseDoors);
    });
  }, []);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
  };
  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    Http.delete("/doors", id)
      .then((response) => {
        if (response.status !== 200) return alert("Deu ruim");
        return alert("Deu bom!"); //TODO adicionar um unshift
      })
      .catch(() => {
        alert("Deu Ruim ):");
      });

    console.log(event.currentTarget.value);
  };

  const backHandler = () => {
    props.changePage("main");
  };
  return (
    <>
      <h2>Doors List</h2>
      <button onClick={backHandler}>Voltar ao início</button>
      <ul>
        {doors.map((door) => {
          return (
            <li key={door.id}>
              {door.text}
              <button value={door.id} onClick={editHandler}>
                edit
              </button>
              <button value={door.id} onClick={deleteHandler}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
