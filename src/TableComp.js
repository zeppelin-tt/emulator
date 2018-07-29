import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const accs = [];

function addAccs(quantity) {
    // const startId = accs.length;
    for (let i = 0; i < quantity; i++) {
        // const id = startId + i;
        accs.push({
            accnum: 100000000000 + i,
            fio: `ФИО ${i}`,
            balance: 1 + i,
            create_time: new Date(2011, 0, {i})
        });
    }
}

addAccs(10);

export default class TableComp extends React.Component {
    constructor(props) {
        super(props);
    }
    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
            </p>
        );
    }
    render() {

        const options = {
            page: 1,
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: '20', value: 20
            } ]
            ,sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 10,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal

        };
        return (
            <div>
                <BootstrapTable data={ accs } pagination={ true } options={options} >
                    <TableHeaderColumn dataField='accnum' isKey={ true }>Номер счёта</TableHeaderColumn>
                    <TableHeaderColumn dataField='fio'>ФИО</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Баланса</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Открытие счёта</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
