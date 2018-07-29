import React, {Component} from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory from 'react-bootstrap-table2-filter';
// import {columns, accs} from './acc_table';
// import '.acc_table.css'
import TableComp from './TableComp';

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

        // const table = {TableComp.};
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
                {/*<BootstrapTable keyField='accnum' data={accs} columns={columns} filter={filterFactory()}/>*/}
                {TableComp}
            </form>
        )
    }
}

export default Operations;
