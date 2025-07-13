import { useEffect, useState } from "react"
import { useParams } from "react-router";

export default function WorkoutDetails() {
    const [workout, setWorkout] = useState([])

    // test environment
    const test = `http://localhost:8080`;
    const live = ``;
    const BASE_URL = test;

    const {id} = useParams()

    useEffect(() => {
        async function fetchWorkout() {
            try {
                const res = await fetch(`${BASE_URL}/workouts/${id}`)
                if(!res.ok){
                    throw new Error("HTTP error");
                }
                const data = await res.json()
                // console.log(data)
                setWorkout(data) 
                } catch(error){
                    console.log(error)
                }
        }
        fetchWorkout()
    }, [])

    // console.log(workout)

    return(
        <div>
        {workout.length > 0 ? (
            <>
            <div>
            <h2>{workout[0].title}</h2>
        </div>
        <img src={workout[0].image}/>
        </>
        ):(<p>Loading...</p>)}
        <table>
            <thead>
            <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
            </tr>
            </thead>
            <tbody>
        {workout.map((exercise) => (
            // <div key={exercise.id}>
            //     <p>{exercise.exercise}</p>
            //     <p>{exercise.sets}</p>
            //     <p>{exercise.reps}</p>
            // </div>
            <tr key={exercise.id}>
                <td>{exercise.exercise}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.reps}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    )
}