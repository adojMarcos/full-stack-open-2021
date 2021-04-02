import React from 'react'

const Filter = (props) => {
    return <> filter show with: <input onChange={props.handleFilter} value={props.filter} /> </>
}

export default Filter;