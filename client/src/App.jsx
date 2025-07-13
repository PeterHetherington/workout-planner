import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Nav from './components/Nav'
import Workouts from './pages/Workouts'
import Exercises from './pages/Exercises'
import Home from './pages/Home'
import WorkoutDetails from './pages/WorkoutDetails'
import CreateExercise from './pages/CreateExercise'
import CreateWorkout from './pages/CreateWorkout'
import FilteredExercises from './pages/FilteredExercises'

function App() {

  return (
    <BrowserRouter>
     <Nav />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/workouts' element={<Workouts />} />
      <Route path='/workouts/:id' element={<WorkoutDetails />} />
      <Route path='/exercises' element={<Exercises />} />
      {/* <Route path='/exercises/:id' element={<FilteredExercises />} /> */}
      <Route path='/create/exercise' element={<CreateExercise />} />
      <Route path='/create/workout' element={<CreateWorkout />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
