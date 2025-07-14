import { Link } from "react-router"
import '../styles/WorkoutCard.css'

export default function WorkoutCard(props) {

    // function handleDelete() {

    // }

    return (
    <div className="workout-container">
        <Link style={{ textDecoration: 'none', color: 'inherit' }} className="wBtn" to={`/workouts/${props.id}`}>
            <div className="img-container">
                <img className="workout-img" src={props.img} onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://i.pinimg.com/736x/78/8e/75/788e75a0b5cf7c7be4a315360d56c491.jpg' // fallback for if user uploads broken image to db
                }}/>
            </div>
            <div className="info">
                <h3 className="wTitle">{props.name}</h3>
                <p className="wDesc">{props.desc}</p>
            </div>
        </Link>
        {/* <button onClick={handleDelete}>Delete workout</button> */}
    </div> 
    )
}