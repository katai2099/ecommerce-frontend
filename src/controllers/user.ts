import { setDefaultAddressAction } from "../actions/userActions";
import { store } from "../store/configureStore";

export function setAddressAsDefault(addressId: number): Promise<string> {
  return store
    .dispatch(setDefaultAddressAction(addressId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
