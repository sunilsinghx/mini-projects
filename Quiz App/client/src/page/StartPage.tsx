import { Link } from "react-router-dom"

const StartPage = () => {
  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-linear-to-b from-blue-400 to-blue-800">
    <h1 className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg">
      Quiz App
    </h1>

    <Link to="/quiz">
      <button className="px-8 py-4  bg-white text-black font-semibold rounded-lg shadow-lg">
        Start Quiz
      </button>
    </Link>

    <p className="mt-6 font-medium text-gray-100">
      Test your knowledge and have fun!
    </p>
  </div>
  )
}

export default StartPage