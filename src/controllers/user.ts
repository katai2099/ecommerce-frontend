import {
  getAddressesAction,
  setDefaultAddressAction,
} from "../actions/userActions";
import { IAddress } from "../model/user";
import { store } from "../store/configureStore";

export function setAddressAsDefault(addressId: number): Promise<string> {
  return store
    .dispatch(setDefaultAddressAction(addressId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getUserAddresses(): Promise<IAddress[]> {
  return store
    .dispatch(getAddressesAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
