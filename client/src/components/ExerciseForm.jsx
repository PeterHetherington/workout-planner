import { useEffect, useState } from "react"
import '../styles/ExerciseForm.css'

export default function ExerciseForm(props) {
    const [types, setTypes] = useState([])
    const [formValues, setFormValues] = useState([])

    // test environment
    const test = `http://localhost:8080`;
    const live = ``;
    const BASE_URL = test;


    function handleInputChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value,
        })
    }

    // form submit
    async function handleSubmit(e) {
        e.preventDefault()
        // console.log(formValues)
        try{
            const res = await fetch(`${BASE_URL}/exercises`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })
            props.close()
            alert("Exercise added, Thank you!")

        } catch(error){
            console.log(error)
        }

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
    
    return(
        <div className='backdrop'>
            <div className='modal'>
                <form onSubmit={handleSubmit}>
                    <h1>New Exercise</h1>
                    <div className="form-group">
                        <label htmlFor="name">Exercise name</label>
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
                    <button className='submit' type="submit" >Submit</button>
                </form>
                <button className='close' onClick={props.close}>&times;</button>
            </div>
        </div>
    )
}