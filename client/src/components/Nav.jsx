import { Link } from "react-router"

export default function Nav() {
    return(
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/workouts'>Workouts</Link>
                <Link to='/exercises'>Exercises</Link>
            </nav>
        </div>
    )
}