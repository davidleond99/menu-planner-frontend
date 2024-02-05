import customAxiosApp from "../../../shared/axiosConfig";
import { BaseCrudService } from "../../../shared/baseCrud";

export class IngredeintsServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "ingredients");
  }
}

const ingredientService = new IngredeintsServices();
export default ingredientService;
