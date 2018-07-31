import React, {Component} from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory from 'react-bootstrap-table2-filter';
// import {columns, accs} from './acc_table';
// import '.acc_table.css'
// import TableComp from './TableComp';
import axios from 'axios'

class Operations extends Component {


    constructor(props) {
        super(props);
        this.state = {value: 'create'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({text: event.target.options[event.target.selectedIndex].text});
    }

    handleSubmit(event) {
        // alert('Вы действительно уверны, что хотите: ' + this.state.text + '?');
        let type_action = this.state.value;
        let num_acc = this.state.accnum;
        let second_accnum = this.state.second_accnum;
        let lastname = this.state.lastname;
        let firstname = this.state.firstname;
        let patronymic = this.state.secondname;

        let sendData = [{
            "type" : type_action,
            "lastName" : lastname,
            "firstName" : firstname,
            "patronymic" : patronymic,
            "accNum" : num_acc,
            "secondAccNum" : second_accnum
        }];

        axios.post('http://localhost:8080/rest/account/action', JSON.stringify(sendData))
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render() {

        let acc_num = <input name="accnum" type="text" placeholder="Счет клиента" onChange={this.handleInputChange}/>;
        let second_input;
        let second_input_text;
        let input_fio;
        if (this.state.value === "transfer_to") {
            second_input = <input name="second_accnum" type="text" placeholder="Счет получателя" onChange={this.handleInputChange}/>;
            second_input_text = " ==> ";
        }
        if (this.state.value === "create") {
            input_fio =
                <label>
                    <input name="lastname" type="text" placeholder="Фамилия" onChange={this.handleInputChange}/>
                    <input name="firstname" type="text" placeholder="Имя" onChange={this.handleInputChange}/>
                    <input name="secondname" type="text" placeholder="Отчество" onChange={this.handleInputChange}/>
                </label>;
            acc_num = "";
        }

        return (
            <form className="Operations" onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>
                {acc_num}
                {second_input_text}{second_input}
                {input_fio}
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
                {/*{TableComp}*/}
            </form>
        )
    }
}

export default Operations;
