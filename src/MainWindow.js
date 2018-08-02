import React, {Component} from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import {css} from 'aphrodite';
import styles from './Styles';
import BootStyle from './bootstrap.min.css'

class MainWindow extends Component {


    constructor(props) {
        super(props);
        this.state = {text: 'Создать счёт'};
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
        let type_action = this.state.value;
        let num_acc = this.state.accnum;
        let second_accnum = this.state.second_accnum;
        let lastname = this.state.lastname;
        let firstname = this.state.firstname;
        let patronymic = this.state.secondname;
        let money = this.state.resources;

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
                console.log(error);
                alert("Дерьмо случается!")
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
        let money;
        if (this.state.value === "transfer_to") {
            second_input = <input name="second_accnum" type="text" placeholder="Счет получателя"
                                  onChange={this.handleInputChange}/>;
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
        const actions_with_money = ["transfer_minus", "transfer_plus", "transfer_to"];
        if (actions_with_money.includes(this.state.value)) {
            money = <input name="resources" type="text" placeholder="Сумма, руб." onChange={this.handleInputChange}/>;
        }

        return (
            <form className="BootStyle" style={{textAlign: 'center'}}>
                {acc_num}
                {second_input_text}{second_input}
                {input_fio}{money}
                <select className={css(styles.select)} value={this.state.value} onChange={this.handleChange}>
                    <option value="create">Создать счет</option>
                    <option value="close">Закрыть счет</option>
                    <option value="block">Заблокировать счет</option>
                    <option value="transfer_minus">Снять сумму</option>
                    <option value="transfer_plus">Зачислить сумму</option>
                    <option value="transfer_to">Перечислить клиенту</option>
                </select>
                <input className="BootStyle" type="submit" onSubmit={this.handleSubmit} value="Выполнить"/>
                {/*<DataTable />*/}
            </form>
        )
    }
}

export default MainWindow;
