import { api } from "encore.dev/api";

interface StatusResponse {
  uptime: number;
  message: string;
}

export const status = api(
  { method: "GET", path: "/status" },
  async (): Promise<StatusResponse> => {
    return {
      uptime: process.uptime(),
      message: "Server is running smoothly!",
    };
  },
);
