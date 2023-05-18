import { Box, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import image from "../assets/photo.png";
import { ImageLike } from "tesseract.js";

const fileTypes = ["JPEG", "PNG", "GIF"];
interface UploaderProps {
  imageData: string | ImageLike | ArrayBuffer | null | undefined;
  handleChange(e: File): void;
}

function Uploader({ imageData, handleChange }: UploaderProps) {
  return (
    <Box>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="image"
        types={fileTypes}
      >
        <Box
          sx={{
            borderRadius:'5px',
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
                maxWidth: "27em",
                margin: "1em",
                objectFit: "fill",
                aspectRatio: "1/1",
              }}
              alt="uploaded"
            />
          ) : (
            <>
              <img src={image} style={{ width: "10em", height: "10em" }} alt="upload"/>
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
    </Box>
  );
}
export default Uploader;
