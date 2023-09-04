import { addProductAction } from "../actions/productActions";
import { IIdName } from "../model/common";
import {
  INewProductRequest,
  IProduct,
  IProductSize,
  ProductMode,
} from "../model/product";
import {
  setEditedProduct,
  setProductMode,
  setProductSubmitData,
  setSelectedProduct,
} from "../reducers/productReducer";
import { store } from "../store/configureStore";

export function addNewProduct(product: IProduct, files: File[]) {
  store.dispatch(setProductSubmitData(true));
  const uploadProduct: INewProductRequest = {
    productData: product,
    files: files,
  };
  store
    .dispatch(addProductAction(uploadProduct))
    .unwrap()
    .then((data) => {
      store.dispatch(setSelectedProduct(data));
      store.dispatch(setEditedProduct(data));
      store.dispatch(setProductMode(ProductMode.VIEW));
    })
    .finally(() => {
      store.dispatch(setProductSubmitData(false));
    });
}

export function setProductSizes(
  productSizes: IIdName[],
  editedProduct: IProduct
) {
  const sizes: IProductSize[] = [];
  productSizes.forEach((pz) => {
    const productSize: IProductSize = { id: 0, stockCount: 0, size: pz };
    sizes.push(productSize);
  });
  store.dispatch(
    setEditedProduct({ ...editedProduct, ["productSizes"]: sizes })
  );
}
