import { useState, useEffect } from "react";
import "./App.css";
import { createWorker } from "tesseract.js";
import Uploader from "./Components/Uploader";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import copyImage from "./assets/copy.png";

function App() {
  const [loading, setLoading] = useState<number>(0);
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState<
    Tesseract.ImageLike | string | ArrayBuffer | null
  >();

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);
  const convertImageToText = async () => {
    const worker = await createWorker({
      logger: (m) => {
        if (m?.progress > 0) setLoading(Math.floor(m.progress * 100));
      },
    });
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const image: Tesseract.ImageLike =
      typeof imageData === "string" ? imageData : "";
    const {
      data: { text },
    } = await (await worker).recognize(image);
    setOcr(text);
  };

  useEffect(() => {
    setOcr("");
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e: File) {
    const file = e;
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="App">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h1">OCR Online </Typography>
          <Typography variant="h2">convert image to text </Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={3}>
          <Uploader imageData={imageData} handleChange={handleImageChange} />
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {loading > 0 && loading < 100 && (
            <>
              <CircularProgress variant="determinate" value={loading} />
              <Typography>Loading</Typography>
            </>
          )}
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              boxShadow: "inset 0 0 10px black",
              height: "30em",
              overflowY: "auto",
              overflowX: "unset",
              display: "flex",
              flexDirection: "column",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                boxShadow: "inset 0 0 4px #000000",
              }}
            >
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(ocr);
                }}
              >
                <img
                  alt="copy"
                  src={copyImage}
                  style={{ width: "2em", height: "2em", marginRight: ".5em" }}
                />{" "}
                Copy
              </Button>
            </Box>
            <Typography sx={{ padding: "1em" }}>{ocr}</Typography>
          </Box>
        </Grid>

        <Grid item xs={1} />
      </Grid>
    </div>
  );
}

export default App;
