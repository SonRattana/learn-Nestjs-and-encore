import { App } from "encore"; // Import trực tiếp từ "encore"

export const app = App({
  name: "nestjs-encore",
  description: "Encore app for NestJS backend",
});

// Import API từ các module khác để tránh xung đột
import "./hello/hello";
import "./foo/foo";
import "./notes/notes";
import "./status/status";
