import { AlertColor } from "@mui/material";
import { setSnackbarState } from "../reducers/guiReducer";
import { store } from "../store/configureStore";

export function clone<T = any>(whatToClone: T): T {
  return JSON.parse(JSON.stringify(whatToClone));
}

export function recordToFormData(data: Record<string, any>) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (key !== "files") {
        data[key] = JSON.stringify(value);
      }
    }
  }
}

export function prepareFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  // Append non-file data as is
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (key !== "files") {
        const blob = new Blob([JSON.stringify(value)], {
          type: "application/json",
        });
        formData.append(key, blob);
      }
    }
  }

  // Append files
  const files = data.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  }

  return formData;
}

export function formatFileSize(bytes: number, decimalPoint: number = 2) {
  if (bytes === 0) return "0 Bytes";
  var k = 1000,
    dm = decimalPoint,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

export function isRecordValueEmpty<T>(
  obj: Record<string, T>,
  skipKeys: string[] = []
): boolean {
  for (const key in obj) {
    if (!skipKeys.includes(key) && obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== "") {
        return false;
      }
    }
  }
  return true;
}

export function showSnackBar(
  text: string,
  severity: AlertColor,
  snackbarVerticalPos?: "top" | "bottom",
  snackbarHorizontalPos?: "left" | "right"
) {
  store.dispatch(
    setSnackbarState({
      showSnackbar: true,
      snackbarText: text,
      snackbarSevirity: severity,
      snackbarVerticalPos: snackbarVerticalPos ? snackbarVerticalPos : "top",
      snackbarHorizontalPos: snackbarHorizontalPos
        ? snackbarHorizontalPos
        : "right",
    })
  );
}

export function validateEmailRegex(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isStringEmpty(value: string): boolean {
  return value.trim().length === 0;
}

export function processOrPredicate<T>(filter: T[]): string {
  const orPredicate = filter.join("::");
  return orPredicate;
}
