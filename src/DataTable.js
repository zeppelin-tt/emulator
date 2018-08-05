import React from 'react';
import filterFactory, {
    textFilter, numberFilter
    // , dateFilter
} from 'react-bootstrap-table2-filter';
import {accsGenerator} from './utils/common.js'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
// import paginationFactory from 'react-bootstrap-table2-paginator'
import styles from "./Styles";
import {css} from "aphrodite";


export default class DataTable extends React.Component {


    render() {

        const accs = accsGenerator(10);

        const columns = [{
            dataField: 'numAcc',
            text: 'Номер счёта',
            filter: textFilter({caseSensitive: true})
        }, {
            dataField: 'fio',
            text: 'ФИО',
            filter: textFilter({caseSensitive: true}),
            sort: true
        }, {
            dataField: 'balance',
            text: 'Баланс',
            // filter: 'customFilter',
            sort: true
        }
            // ,
            //     {
            //     dataField: 'create_time',
            //     text: 'Открытие счёта',
            //     filter: dateFilter(),
            //     sort: true
            // }
        ];

        return (
            <div className={css(styles.table)}>
            <BootstrapTable keyField='numAcc'
                            data={accs}
                            columns={columns}
                            filter={filterFactory()}
                            // pagination={paginationFactory()}
            />
            </div>
        )
    }
}