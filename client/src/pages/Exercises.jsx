import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router"
import ExerciseForm from "../components/ExerciseForm";
import '../styles/Exercises.css'

export default function Exercises() {
    const [exercises, setExercises] = useState([])
    // modal
    const [newExercise, setNewExercise] = useState(null)
    // exercise categories
    const [types, setTypes] = useState([])
    
    // filter
    const [searchParams, setSearchParams] = useSearchParams();

    const filterChange = (event) => {
        setSearchParams({ category: event.target.value });
     };

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
            const res = await fetch(`${BASE_URL}/exercises`)
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
    }, [searchParams])

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
            <button className="createNew" onClick={openModal}>Create a new exercise</button>
            <form className="filter">
                <label>Filter by</label>
                <select value={searchParams.get("category") || ""} onChange={filterChange}>
                    <option></option>
                {types.map((type) => (
                    // <button value={type.id} >{type.name}</button>
                    // <Link key={type.id} className="filter" to={`/exercises?category=${type.id}`} >{type.name}</Link>
                    // <Link key={type.id} className="filter" to={`/exercises/${type.id}`} >{type.name}</Link>
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))} 
                </select>
            </form>
            </div>
            {/* <Link className="create" to='/create/exercise'>Create a new exercise</Link> */}
            <div className="exercise-container">
            {exercises.map((exercise) => (
                <div className="exercise" key={exercise.id}>
                    <h3>{exercise.name}</h3>
                    <p>{exercise.description}</p>
                </div>
            ))} 
            </div>
            {newExercise && <ExerciseForm close={() => setNewExercise(null)} />}
        </div>
    )
}