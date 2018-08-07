import React, {Component} from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import {css} from 'aphrodite';
import styles from './Styles';
import './bootstrap.min.css'
import Cleave from 'cleave.js/react'


class MainWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Создать счёт',
            value: 'create',
            tableOn: false,
            list_table: [],
            count_rows: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getTableView = this.getTableView.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({text: event.target.options[event.target.selectedIndex].text});
    }

    handleSubmit() {

        let type_action = this.state.value;
        let num_acc = this.state.accnum;
        if (num_acc !== undefined) {
            num_acc = num_acc.replace(/ /g, '')
        }
        let second_accnum = this.state.second_accnum;
        if (second_accnum !== undefined) {
            second_accnum = num_acc.replace(/ /g, '')
        }
        let lastname = this.state.lastname;
        let firstname = this.state.firstname;
        let patronymic = this.state.secondname;
        let money = this.state.resources;
        if (money !== undefined) {
            money = money.replace(/,/, '')
        }

        const sendData = {
            "type": type_action,
            "lastName": lastname,
            "firstName": firstname,
            "patronymic": patronymic,
            "accNum": num_acc,
            "secondAccNum": second_accnum,
            "money": money
        };

        const header = {
            headers:
                {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
        };

        axios.post('http://localhost:8080/rest/account/action', JSON.stringify(sendData), header)
            .then((response) => {
                console.log(response);
                if (response.data['success'] === 'true') {
                    alert("Операция " + this.state.text + " выполнена успешно!")
                } else {
                    alert(response.data['message'])
                }
            })
            .catch((error) => {
                alert("Дерьмо случается!")
            });

    }

    getTableView() {
        const self = this;
        const header = {
            headers:
                {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
        };
        axios.get('http://localhost:8080/rest/account/view/0', header)
            .then((response) => {
                self.processData(response.data['data'])
            }).catch((error) => {
            console.log(error);
            alert("Дерьмо случается и с табличкой!")
        });
    }


    processData(data) {
        this.setState({
            list_table: data['view'],
            count_rows: data['countRows']
        });

        console.log(this.state.list_table);
        console.log(this.state.count_rows);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === "tableOn" && this.state.tableOn === false) {
            this.getTableView();
        }
        this.setState({
            [name]: value
        });
    }

    render() {

        let acc_num = <Cleave name="accnum" options={{creditCard: true}} type="text" placeholder="Счет клиента"
                             onChange={this.handleInputChange}/>;
        let second_acc_num;
        let second_input_text;
        let input_fio;
        let money;
        let table;

        if (this.state.tableOn === true) {
            table = <DataTable listTable={this.state.list_table} countRows={this.state.count_rows}/>;
        }
        if (this.state.value === "transfer_to") {
            second_acc_num =
                <Cleave name="second_accnum" options={{creditCard: true}} type="text" placeholder="Счет получателя"
                       onChange={this.handleInputChange}/>;
            second_input_text = " ==> ";
        }
        if (this.state.value === "create") {
            input_fio =
                <lable>
                    <input className={css(styles.input_initials)} name="lastname" type="text" placeholder="Фамилия"
                           onChange={this.handleInputChange}/>
                    <input className={css(styles.input_initials)} name="firstname" type="text" placeholder="Имя"
                           onChange={this.handleInputChange}/>
                    <input className={css(styles.input_initials)} name="secondname" type="text"
                           placeholder="Отчество" onChange={this.handleInputChange}/>
                </lable>
            acc_num = "";
        }
        const actions_with_money = ["transfer_minus", "transfer_plus", "transfer_to"];
        if (actions_with_money.includes(this.state.value)) {
            money = <Cleave name="resources" options={{numeral: true, numeralIntegerScale: 6}} type="text" placeholder="Сумма, руб." onChange={this.handleInputChange}/>;
        }

        return (

            <form className={css(styles.menu)}>
                {acc_num}{second_input_text}{second_acc_num}{input_fio}{money}
                <select className={css(styles.select)}
                        value={this.state.value}
                        onChange={this.handleChange}>
                    <option value="create">Создать счет</option>
                    <option value="close">Закрыть счет</option>
                    <option value="block">Заблокировать счет</option>
                    <option value="transfer_minus">Снять сумму</option>
                    <option value="transfer_plus">Зачислить сумму</option>
                    <option value="transfer_to">Перечислить клиенту</option>
                </select>
                <input type="submit"
                       onClick={this.handleSubmit}
                       value="Выполнить"/>
                <input name="tableOn"
                       className={css(styles.tableCheckbox)}
                       type="checkbox"
                       checked={this.state.tableOn}
                       onChange={this.handleInputChange}
                       value="Таблица"/>
                {table}
            </form>
        )
    }
}

export default MainWindow;
