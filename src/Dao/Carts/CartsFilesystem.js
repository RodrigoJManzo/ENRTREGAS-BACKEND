import { ContainerFilesystem } from "../../Containers/index.js";
import { config } from "../../config/index.js";

/**
 * extending the class allows us to use all the methods in that DBsystem
 */

export class CartsFilesystem extends ContainerFilesystem {
  constructor() {
    super(config.DATABASES.filesystem.CARTS_FILENAME);
  }
}
