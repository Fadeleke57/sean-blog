import React from 'react';
import { chaoticOrbit } from 'ldrs'

chaoticOrbit.register()

// Default values shown
function Loader() {
  return (
    <div className='loader-wrapper'>
      <l-chaotic-orbit
        size="150"
        speed="1.5" 
        color="black" 
      ></l-chaotic-orbit>
    </div>

  )
}

export default Loader