import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import ExerciseForm from "../components/ExerciseForm";

export default function FilteredExercises() {
    const [exercises, setExercises] = useState([])
        // modal
        const [newExercise, setNewExercise] = useState(null)
        // exercise categories
        const [types, setTypes] = useState([])
        
        const {id} = useParams()
    
         // test environment
        const test = `http://localhost:8080`;
        const live = `https://workout-planner-server-yn90.onrender.com`;
        const BASE_URL = live;
    
        function openModal() {
            setNewExercise({open})
            // console.log(newExercise)
        }
    
        // get exercises
        useEffect(() => {
            async function fetchExercises() {
                try {
                const res = await fetch(`${BASE_URL}/exercises/${id}`)
                if(!res.ok){
                    throw new Error("HTTP error")
                }
                const data = await res.json()
                    // console.log(data)
                    setExercises(data)
    
                } catch(error) {
                    console.log(error)
                }
            }
            fetchExercises()
            const interval = setInterval(fetchExercises,5000)
            return () => {
                clearInterval(interval)
            }
        }, [])
    
        // console.log(exercises)
    
        // get exercise categories
        useEffect(() => {
            async function fetchTypes() {
                try {
                const res = await fetch(`${BASE_URL}/types`)
                if(!res.ok){
                    throw new Error("HTTP error")
                }
                const data = await res.json()
                    setTypes(data)
    
                } catch(error) {
                    console.log(error)
                }
            }
            fetchTypes()
        })
    
        return(
            <div>
                <h2>Exercises</h2>
                <div className="filter-container">
                <h3>Filter by Category</h3>
                    {types.map((type) => (
                        // <button value={type.id} >{type.name}</button>
                        <Link key={type.id} className="filter" to={`/exercises/${type.id}`} >{type.name}</Link>
                    ))}
                </div>
                {/* <Link className="create" to='/create/exercise'>Create a new exercise</Link> */}
                <button onClick={openModal}>Create a new exercise</button>
                {exercises.map((exercise) => (
                    <div key={exercise.id}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.description}</p>
                    </div>
                ))} 
                {newExercise && <ExerciseForm close={() => setNewExercise(null)} />}
            </div>
        )
}