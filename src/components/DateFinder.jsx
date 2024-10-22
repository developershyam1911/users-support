import React, { useState, useEffect } from 'react'

const DateFinder = ({ mydate }) => {
    const [date, setDate] = useState();
    useEffect(() => {
        const date = new Date(mydate * 1000)
        return setDate(date.toLocaleDateString())
    }, [mydate])
    return (
        <span>{date}</span>
    )
}
export default DateFinder