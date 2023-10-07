import { rest } from "msw";
export const handlers = [
  rest.get("/rooms", (req, res, ctx) => {
    console.log("BATEU AQUI RAPAZZZZZZZZZZZZZZZZ");
  }),
];
