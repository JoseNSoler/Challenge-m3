import React from "react";
import { v4 as uuidv4 } from "uuid";
import { products } from "../../db/db";

import classes from "./../../styles/MainArea/Products.module.scss";
import classesB from "./../../styles/MainArea/MainArea.module.scss";



function Product({user, setterShop, shop}){
    const imgPath = require(`./../../img/models/${user.image}`).default;
    const price = user.price.toFixed(2)
    const priceParce = user.parcelamento[1].toFixed(2)
    console.log("este es el pricneeeeee" + price)

    const clicked = (e) => {
        setterShop(shop + 1)
    }

    const inputKey = `${uuidv4()}.${user}`
    return(
        <li key={inputKey} className={classes.allProducts__ul__li}>
            <div className={classes.allProducts__ul__li__img}>
                <img src={imgPath} alt="" />
                </div>
            <div className={classes.allProducts__ul__li__info}>
                <h4 className={classes.allProducts__ul__li__info__title}>{user.name}</h4>
                <p className={classes.allProducts__ul__li__info__price}>R$ {price}</p>
                <p className={classes.allProducts__ul__li__info__parce}>até {user.parcelamento[0]}x de R${priceParce}</p>
                
            </div>
            <button className={classes.allProducts__ul__li__buy} onClick={clicked}>comprar</button>
            
        </li>
    )
}


function Products({filterUser, orden, prices, setShop, shop}){

    var priceFilter = ""

    var priceState = false

    const finalFilter = [...filterUser]

    // Only one price filter at time
    finalFilter.forEach(function (item){
        if (prices.indexOf(item) > -1){
            priceFilter = item
        }
    })
    // Check for clean filter (only numbers)

    const filter = finalFilter.filter(arr => !prices.includes(arr))
    // console.log(filter)
    var regex = /(\d+)/g;
    priceFilter = priceFilter.match(regex)



   
    const formatter = () => {
        var finalProducts = [];
        var countSize = 0;

        console.log(setShop)


        for (const [key, value] of Object.entries(products)) {
            for (const [keyFil, valueFil] of Object.entries(value)) {
                filter.forEach(function (itemUser) {
                    // size filter
                    if (keyFil === "size") {
                        valueFil.forEach(function (size) {
                            if (itemUser === size) {
                                countSize += 1;
                            }
                        });
                    }
                    // price filter
                    if(keyFil == "price"){
                        if (priceFilter){
                            if (priceFilter.length === 2){
                                if (valueFil > priceFilter[0] && valueFil < priceFilter[1]){
                                    // console.log("22222   " + valueFil + "      " + priceFilter)
                                    priceState = !priceState
                                }
                                
                            }
                            else{
                                if (valueFil > priceFilter[0]){
                                    // console.log("11 " + valueFil + "      " + priceFilter)
                                    priceState = !priceState
                                }
                                
                            }
                            
                            
                        }
                    }
                    // color filter
                    if (valueFil === itemUser) {
                        countSize += 1;
                    }
                });
            }

            // console.log("valor ifnal si se encontro el arlaor "  + priceState )
            
            if (priceFilter){
                if (countSize === filter.length && priceState === true) {
                    finalProducts.push(value);
                    
                }
            }
            else{
                if (countSize === filter.length) {
                    finalProducts.push(value);
                    
                }
            }
            
            //console.log(countSize + "valor final");
            countSize = 0;
            priceState = false
        }

        if (orden.length > 0)
        {
            if(orden[0] === "Maior preço"){
                finalProducts.sort((a,b) => {return b.price - a.price})
            }
            if(orden[0] === "Menor preço"){
                finalProducts.sort((a,b) => {return  a.price + b.price})
            }
            if(orden[0] === "Mas recentes"){
                finalProducts.sort((a,b) => {return b.id - a.id})
            }
            console.log("abemus orden")
        }

        console.log(finalProducts)

        return finalProducts

    }
    console.log("salimos de asdasd")

    var filterProduts = formatter()

    
    const list = filterProduts.map((item) => {
            return <li className={classes.allProducts__li}>{item}</li>})


    
    return(
            <div className={classes.allProducts}>
                <ul className={classes.allProducts__ul}>
                {filterProduts.map((user) => (
                        <Product key={uuidv4()} user={user} setterShop={setShop} shop={shop}/>
                ))}
                </ul>
            </div>
    )
}
export default Products
