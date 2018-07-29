import React from 'react';
import {textFilter, numberFilter, dateFilter} from 'react-bootstrap-table2-filter';
import {accsGenerator} from './utils/common.js'

export const accs = accsGenerator(15);

export const columns = [{
    dataField: 'accnum',
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