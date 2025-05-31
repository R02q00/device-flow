import "dotenv/config"
import express from "express";
import cors from "cors";
import db from "./models/model.js";
import authRoutes from "./routers/auth.route.js";
import userRoutes from "./routers/user.route.js";
import toolsRoutes from "./routers/tools.route.js"
const PORT= process.env.PORT || 5000

const app = express();

const crosOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(crosOptions));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend is here" });
});


app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);
app.use('/api/tools', toolsRoutes)

// get image root
app.use(express.static('Public'));
 
const initializeRoles = async () => {
    const roles = ["user", "moderator", "admin"];
    for (const role of roles) {
        await db.role.findOrCreate({
            where: { name: role },
        });
    }
};

db.sequelize.sync({force: false})
    .then( async() => {
        //active if first try
        //await initializeRoles();
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log("Failed syncronize database :", error)
    })
