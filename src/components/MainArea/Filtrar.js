import { getByDisplayValue } from '@testing-library/dom'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import classes from './../../styles/MainArea/Filtrar.module.scss'
import classesO from './../../styles/MainArea/Ordenar.module.scss'
import useWindowDimensions from './WindowResize.module'


import Controller from './Controller'
import Products from './Products'

function ListItem(props) {
    // list elements


    const [border, setBorder] = React.useState({
        className: classes.main__liSquareNoneBorder
    })



    const clickMe = (e) => {
        const filterValue = props.value;
        console.log(e.target.defaultValue)
        props.filter(filterValue)

    }



    // Returns visual Square and value
    if (props.mode === "size") {

        const proper = `${classes.main__liSquareSize} ${border.className}`

        const inputKey = `${uuidv4()}.input`

        
        return (
            

            <li key={uuidv4()} className={classes.main__liB}>
                <input 
                        className={classes.main__liB__input} 
                        type="checkbox" id={inputKey}
                       />   
                <label htmlFor={inputKey} className={classes.main__liB__label} value={props.value} onClick={e => clickMe(e)}>
                    {props.value}
                            
                </label>
            </li>

        );
    }
    else {
        const inputKey = `${uuidv4()}.input`
        
        return (
                <li key={uuidv4()} className={classes.main__li}>
                    <label  htmlFor={inputKey} htmlFor={inputKey}  value={props.value} className={classes.main__li__label} > 
                        <input
                        className={classes.main__li__label__input}
                        value={props.value}
                        type="checkbox"
                        onClick={clickMe}
                        name="checkbox"
                        id={inputKey} 
                        />
                            {props.value}
                    </label> 
                </li>

        );
    }
}


function NumberList(props) {
    // Create customs li on limited result or full results
    const numbers = props.numbers;
    
    const listItems = numbers.slice(0,props.limit).map((number, index) => {
        return <ListItem 
                    key={`${uuidv4()}.${index}`}
                    value={number}
                    mode={props.mode}
                    change={props.change}
                    filter={props.filter}
                    orden={props.orden}
                    />;
    })
    return (
      <ul > 
        {listItems}
      </ul>
    );
}



class Filtrar extends React.Component {
    // Initial constructor for Filter list
    
    constructor(props) {
        super(props);
        this.state = {
            ordernarDiv: "Ordenar por:",
            optionsF: props.value,
            limit: 5,
            loadMore: false,
            class: classesO.ulOrdenarNone,
            orden: props.orden
        }
        this.handState = this.handState.bind(this);
    }

    handState = (value) => {
        return this.props.getFilter(value)
    }
    
    onLoadMore = (e) => {
        e.preventDefault();
        if (!this.state.loadMore){
            this.setState({
                limit: 10,
                loadMore: true
            });
        }
        else {
            this.setState({
                limit: 5,
                loadMore: false
            });
        }
        
    }

    showOrdenar = (e) => {
        e.preventDefault();
        if (!this.state.loadMore){
            this.setState({
                loadMore: true,
                class: classesO.ulOrdenar__Actv
            });
        }
        else {
            this.setState({
                loadMore: false,
                class: classesO.ulOrdenarNone
            });
        }
    }

    filtOrdernar = (e) => {        
        const textOrden = e.target.outerText

        console.log(e.target.outerText)
    
        this.props.funFilter(textOrden);
    }


    render() {

        const classesActv = `${this.state.class} ${classesO.ulOrdenar__divB}`;

        
        
        if (this.props.mode === "ordenar") {
            const listItems = this.props.value.map((number) =>
                    <li key={`${uuidv4()}.liOrd`} onClick={this.filtOrdernar} value={number}>{number}</li>
);
            return (

                    <div className={classesO.ulOrdenar} onClick={this.showOrdenar}>
                        <div>{this.state.ordernarDiv}
                            <div className={classesO.ulOrdenar__divA} >
                                <i className={classesO.ulOrdenar__arrow}></i>
                            </div>
                        </div>
                        <div className={classesActv}>
                            <ul className={`${this.state.class} classesO.ulOrdenar__but`}>
                                {listItems}
                            </ul>
                        </div>
                    </div>
            )
        }
        else if (this.props.mode === "cores") {
            
            return (

                <div className={classes.main}>
                    <h3 className={classes.main__h2}>CORES</h3>
                    <NumberList numbers={this.state.optionsF} limit={this.state.limit} orden={this.state.orden} filter={this.handState}/>    
                    <a href="#" onClick={this.onLoadMore}>{this.state.loadMore ? "Meinos" : "Mais cores"}</a>
                </div>
            )
        }
        else if (this.props.mode === "precos") {
            const listItemsB = `${this.state.optionsF} ${classes.main__precos}`
            return (
                <div className={classes.main}>
                    <h3 className={classes.main__h2}>FAIXA DE PREÇO</h3>
                    <div>

                    </div>
                    <NumberList numbers={this.state.optionsF} limit={10} orden={this.state.orden} filter={this.handState}/>    
                </div>
            )
            }
        else {
            const listItemsB = `${this.state.optionsF} ${classes.main__precos}`
            return (
                <div className={classes.main}>
                    <h3 className={classes.main__h2}>TAMANHOS</h3>
                    <div className={classes.main__Squares}>
                        <NumberList numbers={this.state.optionsF} limit={12} orden={this.state.orden} filter={this.handState} mode={"size"}/>
                    </div>
                        
                </div>
            )
        }
    }
}

export default Filtrar
