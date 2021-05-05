import ModelUser from "../Models/User";

declare global {
  namespace Express {
    interface User extends ModelUser {}
  }
}
