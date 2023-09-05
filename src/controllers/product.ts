import { addProductAction } from "../actions/productActions";
import { IIdName } from "../model/common";
import {
  Gender,
  INewProductRequest,
  IProduct,
  IProductFilter,
  IProductFilterParams,
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

export function processProductFilter(
  filter: IProductFilter
): IProductFilterParams {
  const filterParams: IProductFilterParams = {};

  if (filter.q) {
    filterParams.q = filter.q;
  }
  if (filter.sort) {
    filterParams.sort = filter.sort;
  }
  if (filter.category && filter.category.length > 0) {
    filterParams.category = processCategory(filter.category);
  }
  if (filter.stock) {
    filterParams.stock = filter.stock;
  }
  if (filter.publish) {
    filterParams.publish = filter.publish;
  }
  if (filter.gender && filter.gender.length > 0) {
    filterParams.gender = processGender(filter.gender);
  }
  if (filter.pmin) {
    filterParams.pmin = filter.pmin;
  }
  if (filter.pmax) {
    filterParams.pmax = filter.pmax;
  }

  if (filter.rating) {
    filterParams.rating = filter.rating;
  }
  if (filter.page) {
    filterParams.page = filter.page;
  }
  return filterParams;
}

function processGender(genders: Gender[]): string {
  const selectedGenders = genders.join("::");
  return selectedGenders;
}

function processCategory(categories: string[]): string {
  const selectedCategories = categories.join("::");
  return selectedCategories;
}
