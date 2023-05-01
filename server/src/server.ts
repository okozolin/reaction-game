import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as router from "./config/routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set("trust proxy", true);

router.init(app);
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
