import React from 'react';
import filterFactory, {
    textFilter, numberFilter
    // , dateFilter
} from 'react-bootstrap-table2-filter';
import {accsGenerator} from './utils/common.js'
import {list} from './MainWindow.js'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
// import paginationFactory from 'react-bootstrap-table2-paginator'
import styles from "./Styles";
import {css} from "aphrodite";


export default class DataTable extends React.Component {


    render() {

        const accs = list;

        const columns = [{
            dataField: 'accNum',
            text: 'Номер счёта',
            // filter: textFilter({caseSensitive: true})
        }, {
            dataField: 'initials',
            text: 'ФИО',
            // filter: textFilter({caseSensitive: true}),
            sort: true
        }, {
            dataField: 'balance',
            text: 'Баланс',
            // filter: 'customFilter',
            sort: true
        }, {
            dataField: 'action',
            text: 'Последняя операция',
            // filter: 'customFilter',
            sort: true
        }, {
            dataField: 'lastOpTime',
            text: 'Время последней операции',
            // filter: 'customFilter',
            sort: true
        }, {
            dataField: 'createTime',
            text: 'Время создания счёта',
            // filter: 'customFilter',
            sort: true
        }];

        return (
            <div className={css(styles.table)}>
                <BootstrapTable keyField='accNum'
                                data={accs}
                                columns={columns}
                                filter={filterFactory()}
                    // pagination={paginationFactory()}
                />
            </div>
        )
    }
}