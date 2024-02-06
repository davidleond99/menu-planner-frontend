import customAxiosApp from "../../../shared/axiosConfig";
import { BaseCrudService } from "../../../shared/baseCrud";

export class MenuServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "menu");
  }
}

const menuService = new MenuServices();
export default menuService;
