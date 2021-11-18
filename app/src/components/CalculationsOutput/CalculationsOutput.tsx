import React, { FC, useState } from 'react';

interface CalculationsOutputProps {
    startDate: string,
    outstandingTasks: {
        min: number,
        max: number
    }
}

const CalculationsOutput:FC<CalculationsOutputProps> = ({startDate, outstandingTasks}) => {
    return (
        <div>
            <h2>Output</h2>
            { startDate }
            <p>Outstanding tasks</p>
            <p>Min: { outstandingTasks.min }; Max: { outstandingTasks.max }</p>
        </div>
    )
}

export default CalculationsOutput;