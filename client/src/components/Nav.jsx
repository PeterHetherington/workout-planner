import { Link } from "react-router"
import '../styles/Nav.css'

export default function Nav() {
    return(
        <div>
            <nav className="nav">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Home</Link>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/workouts'>Workouts</Link>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/exercises'>Exercises</Link>
            </nav>
        </div>
    )
}