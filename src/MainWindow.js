import React, {Component} from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import Cleave from 'cleave.js/react'
import {withAlert} from 'react-alert';


const limitRows = 11;
const domainUrl = 'http://localhost:8080';


class MainWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Создать счёт',
            value: 'create',
            tableOn: true,
            hideAccnums: true,
            list_table: [],
            count_rows: [],
            currentPage: 0,
            isVisibleSidebar: false,
            sidebarOpen: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getTableView = this.getTableView.bind(this);
        this.toggleTable = this.toggleTable.bind(this);
        this.getAccNumInput = this.getAccNumInput.bind(this);
        this.getSum = this.getSum.bind(this);
        this.hideClosedAccs = this.hideClosedAccs.bind(this);

        this.getTableView(0, limitRows, true);
    }

    render() {
        let self = this;
        let rows = [];
        let table;
        let accNum = this.getAccNumInput();
        let sum = this.getSum();

        switch (this.state.value) {
            case "create": {
                rows.push(
                    <div key={'row_' + rows.length} className={'form-group'}>
                        <label>Фамилия</label>
                        <input className={'form-control m-b-20'} name="lastname" type="text"
                               placeholder="Введите фамилию" required={true} maxLength={30} autoComplete="off"
                               onChange={this.handleInputChange}/>

                        <label>Имя</label>
                        <input className={'form-control m-b-20'} name="firstname" type="text" placeholder="Введите имя"
                               required={true} maxLength={30} autoComplete="off"
                               onChange={this.handleInputChange}/>

                        <label>Отчество</label>
                        <input className={'form-control m-b-20'} name="secondname" type="text" required={true}
                               maxLength={30} autoComplete="off"
                               placeholder="Введите отчество" onChange={this.handleInputChange}/>
                    </div>
                );
                break;
            }
            case "transfer_minus":
            case "transfer_plus": {
                rows.push(
                    <div key={'row_' + rows.length}>
                        {accNum}
                        {sum}
                    </div>
                );
                break;
            }
            case "transfer_to": {
                rows.push(
                    <div key={'row_' + rows.length}>
                        {accNum}
                        <label>Счет получателя</label>
                        <input className={'form-control m-b-20'} name="second_accnum" type="text"
                               placeholder="Введите счет получателя" autoComplete="off"
                               onChange={this.handleInputChange}/>
                    </div>
                );
                rows.push(
                    <div key={'row_' + rows.length}>
                        {sum}
                    </div>
                );
                break;
            }
            default: {
                rows.push(
                    <div key={'row_' + rows.length} className={'m-b-20'}>
                        {accNum}
                    </div>
                );
                break;
            }
        }

        if (this.state.tableOn) {
            table = (
                <div className={'selectable'}>
                    <DataTable listTable={this.state.list_table} countRows={this.state.count_rows}/>
                    <nav aria-label="Page navigation example" className={'unselectable'}>
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
            );
        }

        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Live Page</h1>
                </div>

                <div className="col-md-12 col-lg-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Control Panel
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>

                                <select className={'form-control m-b-20'} name="selectAction" value={this.state.value}
                                        onChange={this.handleChange}>
                                    <option value="create">Создать счет</option>
                                    <option value="close">Закрыть счет</option>
                                    <option value="block">Заблокировать счет</option>
                                    <option value="transfer_minus">Снять деньги</option>
                                    <option value="transfer_plus">Пополнить счет</option>
                                    <option value="transfer_to">Перечислить клиенту</option>
                                </select>

                                {rows}

                                <div className={'text-right'}>
                                    <button className={'btn btn-primary'} type="submit">Выполнить</button>
                                </div>
                            </form>

                            <div style={{'marginBottom': '15px'}}>
                                {
                                    this.state.tableOn ? (
                                        <div>
                                            <button className={'btn btn-warning btn-outline'} onClick={function () {
                                                self.toggleTable('test');
                                            }}>Скрыть таблицу
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className={'btn btn-success btn-outline'} onClick={function () {
                                                self.toggleTable('test');
                                            }}>Открыть таблицу
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            <div style={{'marginBottom': '0px'}}>
                                {
                                    this.state.hideAccnums ? (
                                        <div>
                                            <button className={'btn btn-warning btn-outline'} onClick={function () {
                                                self.hideClosedAccs('test');
                                            }}>Показать закрытые
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className={'btn btn-success btn-outline'} onClick={function () {
                                                self.hideClosedAccs('test');
                                            }}>Показать все
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-9">

                    {table}

                </div>
            </div>
        )
    }

    toggleTable(param) {
        let state = this.state;
        state.tableOn = !state.tableOn;
        this.setState(state);
    }

    hideClosedAccs(param) {
        let state = this.state;
        state.hideAccnums = !state.hideAccnums;
        this.setState(state);
        this.getTableView(0, limitRows, state.hideAccnums)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({text: event.target.options[event.target.selectedIndex].text});
    }

    handleSubmit(event) {
        event.preventDefault();

        const op = this.state.value;
        let type_action = this.state.value;
        let num_acc = this.state.accnum;
        // if (num_acc) {
        //     num_acc = num_acc.replace(/ /g, '')
        // }
        let second_accnum = this.state.second_accnum;
        // if (second_accnum !== undefined) {
        //     second_accnum = second_accnum.replace(/ /g, '')
        // }
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
        axios.post(domainUrl + '/rest/account/action', JSON.stringify(sendData), header)
            .then((response) => {
                console.log(response);
                if (response.data['success'] === 'true') {
                    this.props.alert.success("Операция " + this.state.text + " выполнена успешно!");
                    this.getTableView(0, limitRows, this.state.hideAccnums)
                } else {
                    this.props.alert.error(response.data['errorMessage']);
                }
            })
            .catch((error) => {
                this.props.alert.error("Возникли технические проблемы с обработкой запроса. Попробуйте завтра.");
            });
    }

    getTableView(page, limitRows, hideClosed) {
        const self = this;
        const url = domainUrl + `/rest/account/view/page=${page}&limitRows=${limitRows}&hideClosed=${hideClosed}`;
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
            this.props.alert.error("Возникли технические проблемы с обработкой таблицы. Попробуйте завтра.");
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

        const url = domainUrl + `/rest/account/filter`;
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
            this.props.alert.error("Возникли технические проблемы с обработкой таблицы. Попробуйте завтра.");
        });
    }

    processData(data) {
        this.setState({
            list_table: data['view'],
            count_rows: data['countRows']
        });
        console.log(data['view'])
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let state = this.state;

        let page = state.currentPage;
        if (name === "Prev" && page > 0) {
            state ['currentPage'] = --page;
            this.getTableView(page, limitRows, this.state.hideAccnums);
        }

        const rowsLimit = 10;
        if (name === "Next" && page < (state.count_rows / rowsLimit) - 1) {
            state ['currentPage'] = ++page;
            this.getTableView(page, limitRows, this.state.hideAccnums);
        }

        state [name] = value;
        this.setState(state);
    }

    getAccNumInput() {
        return (
            <div className={'m-b-20'}>
                <label>Счет клиента</label>
                <input name="accnum" className={'form-control'} options={{creditCard: true}} type="text"
                       placeholder="Введите счет клиента"
                       onChange={this.handleInputChange} autoComplete="off"/>
            </div>
        );
    }

    getSum() {
        return (
            <div className={'m-b-20'}>
                <label>Сумма, руб.</label>
                <Cleave name="resources" className={'form-control'}
                        options={{numeral: true, numeralIntegerScale: 6}} type="text"
                        placeholder="Введите сумму, руб." onChange={this.handleInputChange} autoComplete="off"/>
            </div>
        );
    }
}

export default withAlert(MainWindow);
