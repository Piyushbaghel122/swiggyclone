import express from "express";
import proxy  from "express-http-proxy";

const app = express();
const PORT = 5000;

app.use("/ride", proxy("http://localhost:8002"))
app.use("/seller", proxy("http://localhost:8001"))
app.use("/buy", proxy("http://localhost:8000"))


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


