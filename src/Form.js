import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import {columns, accs} from './acc_table';
// import '.acc_table.css'

class Operations extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'create'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({text: event.target.options[event.target.selectedIndex].text});
    }

    handleSubmit(event) {
        alert('Вы действительно уверны, что хотите: ' + this.state.text + '?');
        event.preventDefault();
    }

    render() {

        let accNum = <input type="text" placeholder="Счет клиента"/>;
        let secondInput;
        let secondInputText;
        let inputFIO;
        if (this.state.value === "transfer_to") {
            secondInput = <input type="text" placeholder="Счет получателя"/>;
            secondInputText = " ==> ";
        }
        if (this.state.value === "create") {
            inputFIO =
                <label>
                    <input type="text" placeholder="Фамилия"/>
                    <input type="text" placeholder="Имя"/>
                    <input type="text" placeholder="Отчество"/>
                </label>;
            accNum = "";
        }

        return (
            <form className="Operations" onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>
                {accNum}
                {secondInputText}{secondInput}
                {inputFIO}
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="create">Создать счет</option>
                    <option value="close">Закрыть счет</option>
                    <option value="block">Заблокировать счет</option>
                    <option value="transfer_minus">Снять сумму</option>
                    <option value="transfer_plus">Зачислить сумму</option>
                    <option value="transfer_to">Перечислить клиенту</option>
                </select>
                <input type="submit" value="Выполнить"/>
                <BootstrapTable keyField='accnum' data={accs} columns={columns} filter={filterFactory()}
                                tableStyle={ { border: '#0000FF 2.5px solid' } }
                                containerStyle={ { border: '#FFBB73 2.5px solid' } }
                                headerStyle={ { border: 'red 1px solid' } }
                                bodyStyle={ { border: 'green 1px solid' } }>
                </BootstrapTable>
            </form>
        )
    }
}

export default Operations;
