import React from 'react'
import Products from './Products';

import classes from './../../styles/MainArea/Products.module.scss'

const Controller = (props) => {
    console.log(props)

    const [filters, setFilters] = React.useState([])

    React.useEffect(() => {
        if (props.mode === "none"){
            setFilters(props.value)
        }
    }, [])

    if (props.mode === "none"){
        console.log(props)
        return(
            <Products filter={filters}></Products>
        )
    }
    else {
            return (

            <Products filter={filters}></Products>
        )};
    
}

export default Controller;