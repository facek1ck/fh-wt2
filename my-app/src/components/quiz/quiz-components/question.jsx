import React from 'react';

const Question = (props) => {

  return (
    <div>
     <h2 className="question">{props.content}</h2>
    </div>
  );
}


export default Question;