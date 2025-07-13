import { useEffect, useState } from "react"
import WorkoutCard from "../components/WorkoutCard";
import { Link } from "react-router";

export default function Workouts() {
    const [workouts, setWorkouts] = useState([])


    // test environment
    const test = `http://localhost:8080`;
    const live = `https://workout-planner-server-yn90.onrender.com`;
    const BASE_URL = live;


    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch(`${BASE_URL}/workouts`)
                if(!res.ok){
                    throw new Error("HTTP error");
                }
                const data = await res.json()
                // console.log(data)
                setWorkouts(data) 
                } catch(error){
                    console.log(error)
                }
        }
        fetchWorkouts()
    }, [])

    // console.log(workouts[0])

    return(
        <div>
            <h2>Workouts</h2>
            <Link className="create" to='/create/workout'>Create a new workout</Link>    
        <div className="workouts">
            {workouts.map((workout) => (
                <div key={workout.id}>
                    <WorkoutCard name={workout.name} desc={workout.description} img={workout.image} id={workout.id} />
                </div>
            ))}
        </div>
        </div>
    )
}