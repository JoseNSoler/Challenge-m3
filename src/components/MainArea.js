import React, { Component, useState, useEffect }from 'react'

import classes from "./../styles/MainArea/MainArea.module.scss";
import Controller from './MainArea/Controller';
import Filtrar from './MainArea/Filtrar';
import WindowDimensions from './MainArea/WindowResize.module';
import Products from './MainArea/Products';

import { v4 as uuidv4 } from 'uuid';


export default function MainArea(props){


    const {width, height} = WindowDimensions()

    const colors = [
        "Amarelo", "Azul", "Branco", "Cinza", "Laranja", 
        "Verde", "Vermelho", "Preto", "Rosa", "Vinho"
    ]
    const prices = [
        "de R$0 até R$50", "de R$51 até R$150", "de R$151 até R$300",
        "de R$301 até R$500", "a partir de R$ 500"
    ]
    const sizes = [
        "P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"
    ]
    const ordenar = [
        "Mas recentes", "Menor preço", "Maior preço"
    ]

    const [ ordenUser, setOrdenUser ] = useState([])
    const [ filterUser, setFilterUser ] = useState([])

    useEffect(() => {
        console.log("acabamos de entrar acacacacaca")
    }, [ordenUser, filterUser])



    const handOrden = (value) => {
        console.log(value)
        setOrdenUser([value])
    }

    function HandState(value){
        console.log(value)

        var copyFilter = [... filterUser]
        var index = copyFilter.indexOf(value)
        // setFilterUser(index !== -1 ? copyFilter.splice(index, 1) : copyFilter.push(value)))

        if (index !== -1){
            copyFilter.splice(index, 1)
        }
        else{
            copyFilter.push(value)
            
        }
        setFilterUser(copyFilter)
        console.log(filterUser)
    }


    if (width >= 850) {
        return(
        <div className={classes.mainBox}>
                    <div className={classes.mainBox__divSize}>
                        <p>width: {width} ~ height: {height}</p>
                        <p>[Order]: {ordenUser}</p> --- <p>[Filter] {filterUser} -</p>
                    </div>
    
                    <div className={classes.mainBox__title}>
                        <h2 className={classes.mainBox__title__H2}>Blusas</h2>
                        <Filtrar listOrd={ordenUser} value={ordenar} mode={"ordenar"} funFilter={(value) => handOrden(value)}></Filtrar>
    
                    </div>
                    
                    <div className={classes.mainBox__info}>
                        <div className={classes.mainBox__info__filter}>
                            <Filtrar value={colors} mode={"cores"} getFilter={(value) => HandState(value)} orden={filterUser}></Filtrar>
                            <Filtrar value={sizes} getFilter={(value) => HandState(value)} orden={filterUser}></Filtrar>
                            <Filtrar value={prices} mode={"precos"} getFilter={(value) => HandState(value)} orden={filterUser}></Filtrar>
                        </div>
                        <div className={classes.mainBox__info__products}>
                            <Products filterUser={filterUser} orden={ordenUser} prices={prices} setShop={props.setShop} shop={props.shop}></Products>
                        </div>
                    </div>
                </div>
        )
    }
    else{
        return(
            <div>
                <div className={classes.mainBox__title}>
                        <h2 className={classes.mainBox__title__H2}>Blusas</h2>
                        <Filtrar listOrd={ordenUser} value={ordenar} mode={"ordenar"} funFilter={(value) => handOrden(value)}></Filtrar>
    
                    </div>
                <Products filterUser={filterUser} orden={ordenUser} prices={prices} setShop={props.setShop} shop={props.shop}></Products>
            </div>
        )
    }
    


}

