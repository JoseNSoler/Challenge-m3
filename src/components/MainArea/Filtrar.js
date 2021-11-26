import { getByDisplayValue } from '@testing-library/dom'
import React from 'react'

import classes from './../../styles/MainArea/Filtrar.module.scss'
import classesO from './../../styles/MainArea/Ordenar.module.scss'
import useWindowDimensions from './WindowResize.module'



function ListItem(props) {
    // list elements

    const [properties, setProper] = React.useState({
        className: classes.main__liSquareNone
    })

    const [border, setBorder] = React.useState({
        className: classes.main__liSquareNoneBorder
    })


    const [ switcher, setSwitcher ] = React.useState(true)

    const clickedItem = (value) => {
        console.log(switcher)

        // Changes to blue visual square inside on click
        if (value === "size"){
            if (switcher) {
                setBorder({className:classes.main__liSquareBlueSize});
                setSwitcher(!switcher)
            }
            else {
                setBorder({className:classes.main__liSquareNoneBorder});
                setSwitcher(!switcher)
            }
        }
        else {
            if (switcher) {
                setProper({className:classes.main__liSquareBlue});
                setSwitcher(!switcher)
            }
            else {
                setProper({className:classes.main__liSquareNone});
                setSwitcher(!switcher)
        }
        }
    }

    // Returns visual Square and value
    if (props.mode === "size") {
        const proper = `${classes.main__liSquareSize} ${border.className}`
        return (
        <li className={classes.main__liB} onClick={() => clickedItem("size")}>
            <div className={proper}>
                {props.value}
            </div>
        </li>
        );
    }
    else {
    return (
        <li className={classes.main__li} onClick={() => clickedItem()}>
            <div className={classes.main__liSquare}>
                <div className={properties.className}></div>
            </div>
            {props.value}
        </li>
        );
    }
}


function NumberList(props) {
    // Create customs li on limited result or full results
    const numbers = props.numbers;
    const listItems = numbers.slice(0,props.limit).map((number) =>
    <ListItem key={number.toString()} value={number} mode={props.mode}/>  );

    return (
      <ul> 
        {listItems}
      </ul>
    );
}



class Filtrar extends React.Component {
    // Initial constructor for Filter list
    
    constructor(props) {
        super(props);
        this.state = {
            optionsF: props.value,
            limit: 5,
            loadMore: false,
            class: classesO.ulOrdenarNone
        }
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
        console.log(this.state.loadMore)
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


    render() {
        console.log(this.props.value)
        const classesActv = `${this.state.class} ${classesO.ulOrdenar__divB}`;

        if (this.props.mode === "ordenar") {
            const listItems = this.props.value.map((number) =>
                            <li>{number}</li>);
            return (
                <>
                    <div className={classesO.ulOrdenar} onClick={this.showOrdenar}>
                        <p>Ordenar por:
                            <div className={classesO.ulOrdenar__divA}>
                                <i className={classesO.ulOrdenar__arrow}></i>
                            </div>
                        </p>
                        <div className={classesActv}>
                            <ul className={this.state.class}>
                                {listItems}
                            </ul>
                        </div>
                    </div>
                    
                </>
            )
        }
        else if (this.props.mode === "cores") {

            return (

                <div className={classes.main}>
                    <h2 className={classes.main__h2}>CORES</h2>
                    <NumberList numbers={this.state.optionsF} limit={this.state.limit}/>    
                    <a href="#" onClick={this.onLoadMore}>{this.state.loadMore ? "Meinos" : "Mais cores"}</a>
                </div>
            )
        }
        else if (this.props.mode === "precos") {
            const listItemsB = `${this.state.optionsF} ${classes.main__precos}`
            return (
                <div className={classes.main}>
                    <h2 className={classes.main__h2}>FAIXA DE PREÇO</h2>
                    <div>

                    </div>
                    <NumberList numbers={this.state.optionsF} limit={10}/>    
                </div>
            )
            }
        else {
            const listItemsB = `${this.state.optionsF} ${classes.main__precos}`
            return (
                <div className={classes.main}>
                    <h2 className={classes.main__h2}>TAMANHOS</h2>
                    <div className={classes.main__Squares}>
                        <NumberList numbers={this.state.optionsF} limit={10} mode={"size"}/>
                    </div>
                        
                </div>
            )
        }
    }
}

export default Filtrar
