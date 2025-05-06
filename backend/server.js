import "dotenv/config"
import express from "express";
import cors from "cors";
import db from "./models/model.js";
import authRoutes from "./routers/auth.route.js";
import userRoutes from "./routers/user.route.js";
 
const app = express();

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`,
};
 
app.use(cors(corsOptions));
 
// Parse requests of content-type - application/json
app.use(express.json());
 
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
 
// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js JWT Authentication application." });
});
 
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);
 
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
        // await initializeRoles();
        app.listen(process.env.PORT, ()=>{
            console.log(`Server running on port ${process.env.PORT}`);
            
        })
    })
    .catch((error)=>{
        console.log("Failed syncronize database :", error)
    })
