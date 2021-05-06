import ModelUser from "../Models/User";
import ModelPerson from "../Models/Person";

declare global {
  namespace Express {
    interface Request {
      person?: ModelPerson;
    }
    interface User extends ModelUser {}
  }
}
