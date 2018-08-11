import React, {Component} from 'react';
import DataTable from './DataTable';
// import SideBarSearch from './sidebar/SideBarSearch';
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
            count_rows: [],
            actual_page: 0,
            isVisibleSidebar: false
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

        const op = this.state.value;
        let type_action = this.state.value;
        let num_acc = this.state.accnum;
        if (num_acc !== undefined) {
            num_acc = num_acc.replace(/ /g, '')
        }
        let second_accnum = this.state.second_accnum;
        if (second_accnum !== undefined) {
            second_accnum = second_accnum.replace(/ /g, '')
        }
        let lastname = this.state.lastname;
        let firstname = this.state.firstname;
        let patronymic = this.state.secondname;
        let money = this.state.resources;
        if (money !== undefined) {
            money = money.replace(/,/, '')
        }
        if (op === "create") {
            if (lastname === undefined || firstname === undefined || patronymic === undefined) {
                alert("Все поля должны быть заполнены!");
                return;
            }
        }
        if (op === "close" || op === "block") {
            if (num_acc === undefined) {
                alert("Все поля должны быть заполнены!");
                return;
            }
        }
        if (op === "transfer_minus" || op === "transfer_plus") {
            if (num_acc === undefined || money === undefined) {
                alert("Все поля должны быть заполнены!");
                return;
            }
        }
        if (op === "transfer_to") {
            if (num_acc === undefined || money === undefined || second_accnum === undefined) {
                alert("Все поля должны быть заполнены!");
                return;
            }
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


    getTableView(page) {
        const self = this;
        const url = `http://localhost:8080/rest/account/view/${page}`;
        const header = {
            headers:
                {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
        };
        axios.get(url, header)
            .then((response) => {
                self.processData(response.data['data'])
            }).catch((error) => {
            console.log(error);
            alert("Дерьмо случается и с табличкой!")
        });
    }

    getFilteredTable() {
        const self = this;
        const filterData = {
            "accNum": "",
            "initials": "",
            "firstName": "",
            "patronymic": "",
            "secondAccNum": "",
            "money": ""
        };

        const url = `http://localhost:8080/rest/account/filter`;
        const header = {
            headers:
                {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
        };
        axios.post(url, JSON.stringify(filterData), header)
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
    }

    // updateModal(isVisible) {
    //     this.state.isVisible = isVisible;
    //     this.forceUpdate();
    // }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let page = this.state.actual_page;
        this.setState({
            [name]: value
        });
        if (name === "tableOn" && this.state.tableOn === false) {
            this.setState({actual_page: 0});
            this.getTableView(0);
        }
        if (name === "Prev" && page > 0) {
            this.setState({actual_page: page - 1});
            page--;
            this.getTableView(page);
        }
        if (name === "Next" && page < (this.state.count_rows / 10) - 1) {
            this.setState({actual_page: page + 1});
            page++;
            this.getTableView(page);
        }
    }

    render() {

        let acc_num = <Cleave name="accnum" options={{creditCard: true}} type="text" placeholder="Счет клиента"
                              onChange={this.handleInputChange}/>;
        let second_acc_num;
        let second_input_text;
        let input_fio;
        let money;
        let table;
        let actualPage = 1;

        if (this.state.tableOn === true) {
            table =
                <div>
                    <DataTable listTable={this.state.list_table} countRows={this.state.count_rows}/>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <a className="page-link" name="Prev" onClick={this.handleInputChange} href="#">Prev</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" name="Next" onClick={this.handleInputChange} href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
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
            money = <Cleave name="resources" options={{numeral: true, numeralIntegerScale: 6}} type="text"
                            placeholder="Сумма, руб." onChange={this.handleInputChange}/>;
        }

        return (

            <form className={css(styles.menu)}>
                {/*<div>*/}
                {/*<SideBarSearch className='menu-sidebar left' show={this.props.isVisible} onHide={this.props.onHide}/>*/}
                {/*</div>*/}
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
