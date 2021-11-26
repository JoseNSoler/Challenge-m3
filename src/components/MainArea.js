import React from 'react'

import classes from "./../styles/MainArea/MainArea.module.scss";
import Filtrar from './MainArea/Filtrar';

import Products from './MainArea/Products';

import useWindowDimensions from './MainArea/WindowResize.module'

const MainArea = () => {

    const filters = [ 
        "Amarelo", "Azul", "Branco", "Cinza", "Laranja", 
        "Verde", "Vermelho", "Preto", "Rosa", "Vinho"
    ]

    const prices = [
        "de R$0 até R$50", "de R$51 até R$150", "de R$151 até R$300", "de R$301 até R$500", "a partir de R$ 500"
    ]

    const ordenar = [
        "Mas recentes", "Menor preço", "Maior preço"
    ]

    const sizes = [
        "P", "M", "G", "GG", "U", "36", "38", "40", "36", "38", "40"
    ]

    const { height, width } = useWindowDimensions();

    const [ state, setState ] = React.useState(false)

    if (width >= 850) {
        return (
            <div className={classes.mainBox}>

                width: {width} ~ height: {height}

                <div className={classes.mainBox__title}>
                    <h2 className={classes.mainBox__title__H2}>Blusas</h2>
                    <Filtrar value={ordenar} mode={"ordenar"}></Filtrar>

                </div>
                
                <div className={classes.mainBox__info}>
                    <div className={classes.mainBox__info__filter}>
                        <Filtrar value={filters} mode={"cores"}></Filtrar>
                        <Filtrar value={sizes}></Filtrar>
                        <Filtrar value={prices} mode={"precos"}></Filtrar>
                    </div>
                    <div className={classes.mainBox__info__products}>
                        <Products></Products>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.mainBox}>
                <h2 className={classes.mainBox__title}>Blusas</h2>
                <Products></Products>
            </div>
        )
    }

    
}

export default MainArea
