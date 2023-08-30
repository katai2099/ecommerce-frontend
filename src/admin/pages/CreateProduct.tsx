import {
  Add,
  Clear,
  Photo,
  PhotoAlbum,
  PhotoLibraryOutlined,
  PhotoOutlined,
  Upload,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { NewProductImagePreview } from "../components/NewProductImagePreview";

export const CreateProduct = () => {
  const options = ["Shirt", "Pant", "Hat", "Jeans"];
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop(acceptedFiles) {
      acceptedFiles.map((file) =>
        setFiles((previous: File[]) => [...previous, file])
      );
    },
  });
  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Typography>Add New Product</Typography>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <Paper>
                <Grid container padding="32px">
                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <FormLabel>Product Name</FormLabel>
                      <OutlinedInput
                        fullWidth
                        error
                        required
                        placeholder="Name"
                      />
                      <FormHelperText>required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <FormLabel>Category</FormLabel>
                      <InputLabel></InputLabel>
                      <Select defaultValue={options[0]}>
                        <MenuItem value={options[0]}>Shirt</MenuItem>
                        <MenuItem value={options[1]}>Pant</MenuItem>
                        <MenuItem value={options[2]}>Hat</MenuItem>
                        <MenuItem value={options[3]}>Jeans</MenuItem>
                      </Select>
                      <FormHelperText>required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <FormLabel>Price</FormLabel>
                      <OutlinedInput
                        type="number"
                        fullWidth
                        error
                        required
                        // placeholder="39"
                        inputProps={{ min: 0 }}
                      />
                      <FormHelperText>required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <FormLabel>Description</FormLabel>
                      <OutlinedInput
                        fullWidth
                        error
                        required
                        placeholder="Description"
                        multiline
                        rows={7}
                      />
                      <FormHelperText>required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <FormLabel>Sizes and Stock counts</FormLabel>
                      <IconButton>
                        <Add />
                      </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FormControl sx={{ width: "30%" }}>
                        <Select defaultValue={options[0]}>
                          <MenuItem value={options[0]}>XS</MenuItem>
                          <MenuItem value={options[1]}>S</MenuItem>
                          <MenuItem value={options[2]}>M</MenuItem>
                          <MenuItem value={options[3]}>L</MenuItem>
                        </Select>
                        <FormHelperText>required</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <OutlinedInput
                          type="number"
                          // error
                          required
                          inputProps={{ min: 0 }}
                        />
                        <FormHelperText>required</FormHelperText>
                      </FormControl>

                      <IconButton>
                        <Clear />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper>
                <Grid container padding="32px">
                  <FormControl fullWidth>
                    <FormLabel>Add Images</FormLabel>
                    <section className="container">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <Box
                          height="340px"
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
                              Drop your files here. or &nbsp;
                            </Typography>
                            <Typography color="primary">Browse</Typography>
                          </Box>
                        </Box>
                      </div>
                    </section>
                  </FormControl>
                  <Box width="100%" mt="24px">
                    {files.map((file) => (
                      <NewProductImagePreview file={file} />
                    ))}
                  </Box>
                </Grid>
              </Paper>
              <Box textAlign="right">
                <Button>Add Product</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
