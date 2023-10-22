import { Close, Edit, PhotoLibraryOutlined, Upload } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ETextField } from "../../client/components/common/ETextField";
import { LoadingButton } from "../../client/components/common/LoadingButton";
import {
  addNewCategory,
  updateCategoryCont,
  validateNewCategory,
} from "../../controllers/product";
import { AdminMode } from "../../model/admin";
import { ICategory, NewCategoryError } from "../../model/category";
import {
  resetCategoryState,
  setCategoryMode,
  setEditedCategory,
  setNewCategoryError,
} from "../../reducers/categoryReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { ImagePreviewSection } from "../components/ImagePreviewSection";
import Title from "../components/Title";

export const Category = () => {
  const category = useSelector((state: RootState) => state.category);
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mode = category.mode;
  const error = category.error;
  const editedCategory = category.editedCategory;
  const selectedCategory = category.selectedCategory;
  const disable = mode === AdminMode.VIEW;
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop(acceptedFiles) {
      if (!!error.image) {
        dispatch(setNewCategoryError({ ...category.error, image: "" }));
      }
      const currentFilesLentgh =
        files.length + (category.editedCategory.categoryImage !== "" ? 1 : 0);
      const acceptedFileLength = Math.min(
        1 - currentFilesLentgh,
        acceptedFiles.length
      );
      for (let i = 0; i < acceptedFileLength; i++) {
        setFiles((prev: File[]) => [...prev, acceptedFiles[i]]);
      }
    },
  });

  const updateCategory = (field: string, value: any) => {
    const category: ICategory = { ...editedCategory, [field]: value };
    dispatch(setEditedCategory(category));
  };

  const onCancelClickHandler = () => {
    dispatch(setEditedCategory(selectedCategory));
    dispatch(setNewCategoryError(new NewCategoryError()));
    dispatch(setCategoryMode(AdminMode.VIEW));
  };

  const handleSubmit = () => {
    if (!validateNewCategory(editedCategory, mode, files)) {
      return;
    }
    if (mode === AdminMode.CREATE) {
      addNewCategory(editedCategory, files)
        .then(() => {
          setFiles([]);
        })
        .catch(() => {});
    } else if (mode === AdminMode.EDIT) {
      updateCategoryCont(editedCategory, files)
        .then(() => setFiles([]))
        .catch(() => {});
    }
  };

  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="24px"
        >
          <Typography fontSize="24px" fontWeight="bold">
            {mode === AdminMode.CREATE
              ? "Add New Category"
              : selectedCategory.name}
          </Typography>
          <Box display="flex" gap="8px">
            {mode === AdminMode.VIEW && (
              <IconButton
                onClick={() => {
                  dispatch(setCategoryMode(AdminMode.EDIT));
                }}
              >
                <Edit />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                dispatch(resetCategoryState());
                navigate("/category", { replace: true });
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Box component="form" mb="36px">
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Title bold>Details</Title>
              <Typography color="GrayText">Title, images...</Typography>
            </Grid>
            <Grid item md={8}>
              <Stack padding="24px 24px 24px 0">
                <ETextField
                  label="Category Name"
                  name="name"
                  value={editedCategory.name}
                  disable={disable}
                  error={error.name}
                  onChange={(event) => {
                    if (!!error.name) {
                      dispatch(
                        setNewCategoryError({ ...category.error, name: "" })
                      );
                    }
                    updateCategory(
                      event.currentTarget.name,
                      event.currentTarget.value
                    );
                  }}
                />
                <FormControl>
                  <FormLabel sx={{ pb: "4px" }}>Image</FormLabel>
                  {mode !== AdminMode.VIEW && (
                    <section className="container">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <Box
                          height="250px"
                          border="2px dashed #bbbbbb"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <PhotoLibraryOutlined sx={{ fontSize: "78px" }} />
                          <Box display="flex" alignItems="center">
                            <IconButton>
                              <Upload color="primary" />
                            </IconButton>
                            <Typography>
                              Drop your file here. or &nbsp;
                            </Typography>
                            <Typography color="primary">Browse</Typography>
                          </Box>
                        </Box>
                      </div>
                      <Typography fontSize="12px" pt="8px" color="grayText">
                        only 1 file can be uploaded
                      </Typography>
                    </section>
                  )}
                </FormControl>
                <ImagePreviewSection
                  onLocalImageDelete={function (idx: number): void {
                    setFiles([]);
                  }}
                  onRemoteImageDelete={function (idx: number): void {
                    const updatedCategory: ICategory = {
                      ...editedCategory,
                      categoryImage: "",
                    };
                    dispatch(setEditedCategory(updatedCategory));
                  }}
                  mode={mode}
                  files={files}
                  images={
                    category.editedCategory.categoryImage !== ""
                      ? [
                          {
                            url: category.editedCategory.categoryImage,
                            title: category.editedCategory.name,
                          },
                        ]
                      : []
                  }
                />
                {
                  <Typography color="error" fontSize="12px">
                    {error.image}
                  </Typography>
                }
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}></Grid>
            <Grid item md={8}>
              <Box display="flex" justifyContent="space-between">
                <FormGroup>
                  <FormControlLabel
                    disabled={mode === AdminMode.VIEW}
                    control={
                      <Switch
                        color="success"
                        checked={editedCategory.isTop}
                        onChange={(event) => {
                          updateCategory("isTop", event.currentTarget.checked);
                        }}
                      />
                    }
                    label="Top category"
                  />
                  <FormControlLabel
                    disabled={mode === AdminMode.VIEW}
                    control={
                      <Switch
                        color="success"
                        checked={editedCategory.publish}
                        onChange={(event) => {
                          updateCategory(
                            "publish",
                            event.currentTarget.checked
                          );
                        }}
                      />
                    }
                    label="Publish"
                  />
                </FormGroup>
                <Box alignSelf="flex-end" display="flex" gap="8px">
                  {mode === AdminMode.EDIT && (
                    <Button variant="outlined" onClick={onCancelClickHandler}>
                      Cancel
                    </Button>
                  )}
                  {mode !== AdminMode.VIEW && (
                    <LoadingButton
                      loading={category.loading}
                      title={
                        mode === AdminMode.CREATE ? "Add Category" : "Update"
                      }
                      onClick={handleSubmit}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
