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
