import { api } from "encore.dev/api";

interface PingParams {
  name: string;
}

interface PingResponse {
  message: string;
}

export const hello = api(
  { method: "POST", path: "/hello" },
  async (p: PingParams): Promise<PingResponse> => {
    return { message: `Hello ${p.name}!` };
  },
);
