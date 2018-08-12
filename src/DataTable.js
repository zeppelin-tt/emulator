import React from 'react';
// import filterFactory, {textFilter}
// from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import styles from "./Styles";
import {css} from "aphrodite";


export default class DataTable extends React.Component {

    // getFilters() {
    //     const initials_filterl;
    // }

    render() {
        const acs = this.props.listTable;
        const countRows = this.props.countRows;

        if (!acs.length) {
            return (
                <div>
                    Ничего не найдено
                </div>
            );
        }

        const columns = [{
            dataField: 'accNum',
            text: 'Номер счёта',
            title: true
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
            sort: true
        }, {
            dataField: 'lastOpTime',
            text: 'Время последней операции',
            sort: true
        }, {
            dataField: 'createTime',
            text: 'Время создания счёта',
            sort: true,
        }];

        const options = {
            onSortChange: this.onSortChange
        };

        return (
            <div>
                <BootstrapTable
                    keyField='accNum'
                    data={ acs }
                    columns={ columns }
                    options={ options }
                    // filter={filterFactory()}
                />
            </div>
        )
    }

    onSortChange (sortName, sortOrder) {
        alert (sortName + ' ' + sortOrder);
    }
}