import express from "express";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config()

const app = express()
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log("Server running on port: ", process.env.PORT)    
})


// Add school endpoint
app.post("/addSchool", async (req, res) => {
    const { name, address, latitude, longitude } = req.body

    if (!name || !address || typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({ message: "Input fields missing." })
    }

    try {
        await db.execute(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name, address, latitude, longitude]
        )

        return res.status(200).json({ message: "School added successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong while adding schools." })
    }
})

// get schools
app.get("/listSchools", async (req, res) => {
    const { latitude, longitude } = req.body

    if (typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({ message: "Input fields missing." })
    }

    try {
        const [schools] = await db.execute("SELECT * FROM schools")

        const userLat = parseFloat(latitude)
        const userLon = parseFloat(longitude)

        const schoolsDistance = schools.map(school => {
            const distance = getDistance(userLat, userLon, school.latitude, school.longitude)
            return { ...school, distance }
        })

        schoolsDistance.sort((a, b) => a.distance - b.distance)

        return res.status(200).json({ message: "Schools listed", data: schoolsDistance})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong while listing schools." })
    }
})

// Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371  // r of earth

    const degToRad = (deg) => deg * (Math.PI / 180)

    const dLat = degToRad(lat2 - lat1)
    const dLon = degToRad(lon2 - lon1)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}



