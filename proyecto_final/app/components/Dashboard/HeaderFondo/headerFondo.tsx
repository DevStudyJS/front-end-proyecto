import React from "react"
import styles from "./headerFondo.module.css"

let HeaderData: string = "Mapa de Aventuras"
let Subtitle: string = "Elige tu próxima isla para conquistar"

export default function HeaderFondo()
{
    return(
        <div id="header-hero" className={styles.headerContainer}>
            <h1 className={styles.title}>
                {HeaderData}
            </h1>
            <p className={styles.description}>
                {Subtitle}
            </p>
        </div> 
    );
}