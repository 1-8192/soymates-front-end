import React from 'react'

const CardFront = (props) => {
  return (
    <div className="card-face card-front" style={{backgroundImage: `url(${props.sushi.img})`}}>
      
    </div>
  )
}

export default CardFront;
