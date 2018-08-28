import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'


export default class DataTable extends React.Component {

    render() {
        const acs = this.props.listTable;

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
        }, {
            dataField: 'initials',
            text: 'ФИО',
        }, {
            dataField: 'balance',
            text: 'Баланс',
        }, {
            dataField: 'action',
            text: 'Последняя операция',
        }, {
            dataField: 'lastOpTime',
            text: 'Время последней операции',
        }, {
            dataField: 'createTime',
            text: 'Время создания счёта',
        }];

        return (
            <div>
                <BootstrapTable
                    name='dataTable'
                    keyField='accNum'
                    data={ acs }
                    columns={ columns }
                />
            </div>
        )
    }

}