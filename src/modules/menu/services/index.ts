import customAxiosApp from "../../../shared/axiosConfig";
import { BaseCrudService } from "../../../shared/baseCrud";

export class MenuServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "menu");
  }
}

export const menuService = new MenuServices();

export class MenuServicesByUser extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "menu/byUserId");
  }
}

export const menuServiceByUser = new MenuServicesByUser();
