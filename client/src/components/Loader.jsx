import React from 'react';
import { miyagi } from 'ldrs'

miyagi.register()

function Loader() {
  return (
    <l-miyagi
    size="150"
    stroke="7"
    speed="0.9" 
    color="black" 
    ></l-miyagi>
  )
}

export default Loader