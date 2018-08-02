import React from 'react';
import filterFactory, {textFilter, numberFilter, dateFilter} from 'react-bootstrap-table2-filter';
import {accsGenerator} from './utils/common.js'
import BootstrapTable from 'react-bootstrap-table-next';
import './style.css'
import {css} from 'aphrodite';
import styles from './Styles';

export default class DataTable extends React.Component {

    render() {
        const accs = accsGenerator(15);
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
            filter: numberFilter(),
            sort: true
        }, {
            dataField: 'create_time',
            text: 'Открытие счёта',
            filter: dateFilter(),
            sort: true
        }];

        return (
                <BootstrapTable className={css(styles.table)} keyField='numAcc' data={accs} columns={columns} filter={filterFactory()}/>
        )
    }
}