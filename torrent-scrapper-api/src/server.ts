import app from "./app";
const PORT: number = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
