import React from 'react';

const Task = (props) => {
    
    return (
          <div className="card" style={{backgroundColor: props.done ? 'lightgrey' : '#5bb4c4'}}>

            <p className="title">{props.title}</p>
            <p>Due: {props.deadline}</p>
            <p className="description">{props.description}</p>
            <p className="level" style={{
                backgroundColor:
                props.level === "High" ? "red"
                :props.level === "Medium" ? "orange"
                :"green",
                padding: "0.2em",
                borderRadius: "0.4em"

            }}>{props.level}</p>
            <button onClick={props.markDone} className='doneButton'>Done</button>
            <button className='deleteButton' onClick={props.deleteTask}>Delete</button>

        </div>
    )



}


export default Task;
