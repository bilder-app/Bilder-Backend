import ModelUser from "../Models/User";
import ModelPerson from "../Models/Person";
import ModelBusiness from "../Models/Business";

declare global {
  namespace Express {
    interface Request {
      person?: ModelPerson;
      business?: ModelBusiness;
    }
    interface User extends ModelUser {}
  }
}
