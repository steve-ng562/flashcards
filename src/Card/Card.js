import React from 'react';
import './Card.css'

const Card = (props) => {
	console.log(props.def);
	console.log(props.word);
	return(
<div className="cardContainer">
<div className="Card">

<div className="front">
<div className="def">{props.def}</div>
</div>

<div className="back">
<div className="word">{props.word}</div>
</div>

</div>
</div>
);
}


export default Card;