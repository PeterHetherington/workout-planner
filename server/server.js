import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN, // .env variable
});

// Routes
// Root route
app.get("/", (req, res) => {
  res.json("on root route");
});

// workout route
app.get("/workouts", async (req, res) => {
  try {
    const category = req.query.category
    if(category){
      const workouts = await db.query(`SELECT * FROM workouts WHERE category=$1`, [category])
      res.json(workouts.rows)
    } else{
      const workouts = await db.query(`SELECT * FROM workouts`)
      res.json(workouts.rows)
    }

  } catch(error){
      console.log(error)
      res.status(500).json({error: error})
  }
})

// single workout
app.get("/workouts/:id", async (req, res) => {
  try {
    const {id} = req.params
    const workout = await db.query(`
      SELECT w.name AS title, w.image, e.name AS exercise, we.sets, we.reps, e.id FROM workouts_exercises we 
      JOIN workouts w ON we.workout_id = w.id  
      JOIN exercises e ON we.exercise_id = e.id 
      WHERE w.id=$1`, 
      [id])

    res.json(workout.rows)
  } catch(error){
      console.log(error)
      res.status(500).json({error: error})
  }
})

// exercise route
app.get("/exercises", async (req, res) => {
  try {
    const category = req.query.category
    if(category){
      const exercises = await db.query(`SELECT * FROM exercises WHERE category=$1`, [category])
      res.json(exercises.rows)
    } else{
      const exercises = await db.query(`SELECT * FROM exercises`)
      res.json(exercises.rows)
    }

  } catch(error){
      console.log(error)
      res.status(500).json({error: error})

  }
})

// // filter exercises
// app.get("/exercises/:id", async (req, res) => {
//   try {
//     const {id} = req.params
//     const exercises = await db.query(`SELECT * FROM exercises WHERE category=$1`, 
//       [id])

//     res.json(exercises.rows)
//   } catch(error){
//       console.log(error)
//       res.status(500).json({error: error})
//   }
// })


// GET exercise categories
app.get("/types", async (req, res) => {
  try {
    const type = await db.query(`SELECT * FROM types`)
    res.json(type.rows)
  } catch(error){
    console.log(error)
    res.status(500).json({error: error})
  }
})

// POST
// create a new workout
app.post("/workouts", async (req, res) => {
  try{
    const {name, description, category, image} = req.body
    const result = await db.query('INSERT INTO workouts (name, description, category, image) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, category, image])
    res.status(201).json(result.rows) // return new workout id 
  } catch(error){
      console.log(error)
      res.status(500).json({error: error})
  }
})

// update junction table
app.post("/workoutExercises", async (req, res) => {
  try{
    const {workout_id, exercise_id, sets, reps} = req.body
    const result = await db.query(`INSERT INTO workouts_exercises (workout_id, exercise_id, sets, reps) VALUES ($1, $2, $3)`, [workout_id, exercise_id, sets, reps])
    res.status(201).json("Workout created")
  } catch(error){
      console.log(error)
      res.status(500).json({error: error})
  }
})

// create a new exercise
app.post("/exercises", async (req, res) => {
  try{
    const {name, description, category} = req.body
    const result = await db.query(`INSERT INTO exercises (name, description, category) VALUES ($1, $2, $3)`, [name, description, category])
    res.status(201).json("Exercise created")
  } catch(error){
      console.log(error)
      res.status(500).json({error: error})
  }
})

// delete a workout
app.delete("/workouts/:id", async (req, res) => {
  const id = req.params.id
  try{
    console.log(req.params)
    const result = await db.query('DELETE FROM workouts WHERE id = $1 RETURNING *', [id])
    res.status(200).json(result.rows)
  } catch(error){
    console.log(error)
    res.status(500).json({error: error})
  }
})


app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
