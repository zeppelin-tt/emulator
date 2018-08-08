import React from 'react';
import styles from "./Styles";
import {css} from "aphrodite";


export default class SearchEngine extends React.Component {


    render() {






        return (
            <div className={css(styles.table)}>
                <input type="text" name="search" placeholder="Search..">
            </div>
        )
    }
}