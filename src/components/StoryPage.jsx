import React from 'react'
import { Link } from 'react-router-dom'

const StoryPage = () => {
  return (
    <div>StoryPage
        <Link
              to="/"
              type="button"
              class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Go!
            </Link>
    </div>
  )
}

export default StoryPage