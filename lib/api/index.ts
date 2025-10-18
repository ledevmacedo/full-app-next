// API Client exports
export {
  globalInstance,
  jwtInstance,
  simpleInstance,
  localInstance,
} from "./client";

// Error handling exports
export {
  handleAxiosError,
  handleApiError,
  type AxiosErrorResponse,
} from "./errorHandler";

// Validation exports
export { validateParameters } from "./validation";
