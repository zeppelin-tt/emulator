import React from 'react';
import filterFactory, {
    textFilter, numberFilter
    // , dateFilter
} from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import styles from "./Styles";
import {css} from "aphrodite";


export default class DataTable extends React.Component {


    render() {

        const acs = this.props.listTable;
        const countRows = this.props.countRows;


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
                                data={acs}
                                columns={columns}
                                filter={filterFactory()}
                />
            </div>
        )
    }
}