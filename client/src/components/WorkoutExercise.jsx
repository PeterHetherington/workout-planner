import { useEffect, useState } from "react"

export default function WorkoutExercise(props) {
    const [exercises, setExercises] = useState([])

    // test environment
    const test = `http://localhost:8080`;
    const live = ``;
    const BASE_URL = test;

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
        }, [])

    return (
        <div className="form-group">
            <label htmlFor="category">Exercise</label>
            <select name="category" onChange={props.handleInputChange}>
                <option></option>
                {exercises.map((exercise) => (
                    <option value={exercise.id} key={exercise.id}>{exercise.name}</option>
                ))}
            </select>
            <label htmlFor="sets">Sets</label>
            <input name="sets" required onChange={props.handleInputChange}/>
            <label htmlFor="reps">Reps</label>
            <input name="reps" required onChange={props.handleInputChange}/>
        </div>
    )
}