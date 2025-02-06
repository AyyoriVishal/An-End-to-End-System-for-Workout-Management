import React from 'react'

export default function AllExercises() {

    const handleOpenShoulderPress = () => {
        window.location.href= './exercises/ShoulderPress.html'
    }

  return (
    <div>
        
    <button onClick={()=>handleOpenShoulderPress()}>Shoulder Press</button>

    </div>
  )
}
