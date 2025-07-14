import { useEffect, useState } from "react"
import WorkoutExercise from "../components/WorkoutExercise"
import '../styles/CreateWorkout.css'

export default function CreateWorkout(props) {
    const [types, setTypes] = useState([])

    const [formValues, setFormValues] = useState([])

    const [exerciseCount, setExerciseCount] = useState([1])

    // test environment
    const test = `http://localhost:8080`;
    const live = `https://workout-planner-server-yn90.onrender.com`;
    const BASE_URL = live;

    function increaseCounter() {
        setExerciseCount([...exerciseCount, exerciseCount.length + 1])
    }

    function removeExercise() {
        // Remove last exercise created
        setExerciseCount((count) => count.slice(0, -1))
    }

    function handleInputChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formValues)

    }

    useEffect(() => {
        async function fetchTypes() {
            try {
            const res = await fetch(`${BASE_URL}/types`)
            if(!res.ok){
                throw new Error("HTTP error")
            }
            const data = await res.json()
                // console.log(data)
                setTypes(data)

            } catch(error) {
                console.log(error)
            }
        }
        fetchTypes()
    })

    return (
        <div className='workout-backdrop'>
            <div className='workoutForm'>
                <form onSubmit={handleSubmit}>
                    <h1>New Workout</h1>
                    <div className="form-group">
                        <label htmlFor="name">Workout name</label>
                        <input name="name" required onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" required onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Focus/type</label>
                        <select name="category" onChange={handleInputChange}>
                            <option></option>
                            {types.map((type) => (
                                <option value={type.id} key={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Thumbnail (image address)</label>
                        <input name="image" onChange={handleInputChange}/>
                    </div>
                    {exerciseCount.map((exercise) => (
                        <WorkoutExercise key={exercise.index} handleInputChange={handleInputChange} remove={removeExercise}/>
                    ))}
                    <button className='submit' type="submit" >Submit</button>
                </form>
                <div className="button-container">
                <button className='Wbtn' onClick={increaseCounter} > Add new exercise </button>
                <button className='Wbtn' onClick={removeExercise} > Remove exercise</button>
                </div>
            </div>
        </div>
    )
}