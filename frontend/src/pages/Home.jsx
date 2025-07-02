import { useContext } from "react"
import { AppContext } from "../context/AppContex"

function Home() {
  const {userData} = useContext(AppContext);

  return (
    <div className='min-h-screen bg-linear-120 from-indigo-200 to-indigo-400 flex flex-col items-center justify-center gap-2'>
      <h3 className='text-xl'>Hey {userData ? userData.name : 'Developers'}! 👋</h3>
      <h1 className='text-4xl font-extrabold'>Welcome To Our App</h1>
      <p className='text-lg'>We beleive in quality and customer satifaction.</p>
    </div>
  )
}

export default Home