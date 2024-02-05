import customAxiosApp from "../../../shared/axiosConfig";
import { BaseCrudService } from "../../../shared/baseCrud";

export class RecipeServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "recipe");
  }
}

const recipeService = new RecipeServices();
export default recipeService;
