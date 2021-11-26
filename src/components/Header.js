import React from 'react';

import classes from "./../styles/MainArea/Header.module.scss";

const Header = () => {
    return (
        <header className={classes.header}>
            <a className={classes.header__divLogo} href="/"></a>

            <a href="" className={classes.header__divShop} >
                <img className={classes.header__divShop__img}/>
                <div className={classes.header__divShop__counter}>
                    <span>5</span>
                </div>
            </a>
        </header>
    )
}

export default Header;

/*
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.sizes = {
            width: null,
            height: null
        }
    }

    render() {
        return (
            <header className={classes.header}>
                <a className={classes.header__content} href="/">
    
                </a>
                <nav className={classes.header__nav}>
                    carrito
                </nav>
            </header>
        )
    }
}
**/