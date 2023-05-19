import { Box, Modal, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import image from "../assets/photo.png";
import { ImageLike } from "tesseract.js";
import { useState } from "react";
import React from "react";

const fileTypes = ["JPEG", "PNG", "JPG"];
interface UploaderProps {
  imageData: string | ImageLike | ArrayBuffer | null | undefined;
  handleChange(e: File): void;
  handleUploadingFile(): void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function Uploader({
  imageData,
  handleChange,
  handleUploadingFile,
}: UploaderProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTypeError = (e: string) => {
    setErrorMessage(e);
    handleOpen();
  };
  const handleSizeError = (e: string) => {
    setErrorMessage(e);
    handleOpen();
  };
  return (
    <Box>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="image"
        types={fileTypes}
        onTypeError={handleTypeError}
        maxSize={4}
        minSize={0}
        onSizeError={handleSizeError}
        onSelect={handleUploadingFile}
      >
        <Box
          sx={{
            borderRadius: "5px",
            ":hover": { borderColor: "black" },
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderStyle: "solid",
            borderWidth: ".2em",
            borderColor: "	#2e2e2e",
            boxShadow: "inset 0 0 10px black",
            width: "100%",
            height: "30em",
          }}
        >
          {imageData ? (
            <img
              src={typeof imageData === "string" ? imageData : ""}
              style={{
                maxWidth: "21em",
                margin: "1em",
                objectFit: "fill",
                aspectRatio: "1/1",
              }}
              alt="uploaded"
            />
          ) : (
            <>
              <img
                src={image}
                style={{ width: "10em", height: "10em" }}
                alt="upload"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              ></Box>
              <Typography sx={{}}>Click/Drag Your Image here</Typography>
            </>
          )}
        </Box>
      </FileUploader>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
export default Uploader;
