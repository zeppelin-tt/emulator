import React, {Component} from 'react';
import DataTable from './DataTable';
// import SideBarSearch from './sidebar/SideBarSearch';
import axios from 'axios';
import {css} from 'aphrodite';
import styles from './Styles';
//import './bootstrap.min.css'
import Cleave from 'cleave.js/react'


class MainWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Создать счёт',
            value: 'create',
            tableOn: true,
            list_table: [],
            count_rows: [],
            currentPage: 0,
            isVisibleSidebar: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getTableView = this.getTableView.bind(this);
        this.toggleTable = this.toggleTable.bind (this);

        this.getTableView(0);
    }

    render() {
        let self = this;
        let rows = [];
        let table;

        switch (this.state.value) {
            case "create": {
                rows.push (
                    <div key={'row_' + rows.length} className={'form-group'}>
                        <label>Фамилия</label>
                        <input className={'form-control m-b-20'} name="lastname" type="text" placeholder="Введите фамилию" required={true} maxLength={30} autoComplete="off"
                               onChange={this.handleInputChange}/>

                        <label>Имя</label>
                        <input className={'form-control m-b-20'} name="firstname" type="text" placeholder="Введите имя" required={true} maxLength={30} autoComplete="off"
                               onChange={this.handleInputChange}/>

                        <label>Отчество</label>
                        <input className={'form-control m-b-20'} name="secondname" type="text" required={true} maxLength={30} autoComplete="off"
                               placeholder="Введите отчество" onChange={this.handleInputChange}/>
                    </div>
                );
                break;
            }
            case "transfer_minus":
            case "transfer_plus": {
                rows.push (
                    <div key={'row_' + rows.length}>
                        this.getAccNumInput ()
                    </div>
                );
                rows.push (
                    <div key={'row_' + rows.length} className={'m-b-20'}>
                        <Cleave name="resources" className={'form-control'} options={{numeral: true, numeralIntegerScale: 6}} type="text" autoComplete="off"
                                placeholder="Сумма, руб." onChange={this.handleInputChange}/>
                    </div>
                );
                break;
            }
            case "transfer_to": {
                rows.push (
                    <div key={'row_' + rows.length}>
                        this.getAccNumInput ()
                    </div>
                );
                rows.push (
                    <div key={'row_' + rows.length} className={'m-b-20'}>
                        <Cleave name="second_accnum" className={'form-control'} options={{creditCard: true}} type="text" placeholder="Счет получателя" autoComplete="off"
                                onChange={this.handleInputChange}  />
                    </div>
                );
                rows.push (
                    <div key={'row_' + rows.length} className={'m-b-20'}>
                        <Cleave name="resources" className={'form-control'} options={{numeral: true, numeralIntegerScale: 6}} type="text"
                                placeholder="Сумма, руб." onChange={this.handleInputChange}  autoComplete="off"/>
                    </div>
                );
                break;
            }
            default: {
                rows.push (
                    <div key={'row_' + rows.length}>
                        this.getAccNumInput ()
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
                                {/*<div>*/}
                                {/*<SideBarSearch className='menu-sidebar left' show={this.props.isVisible} onHide={this.props.onHide}/>*/}
                                {/*</div>*/}

                                <select className={'form-control m-b-20'} value={this.state.value}
                                        onChange={this.handleChange}>
                                    <option value="create">Создать счет</option>
                                    <option value="close">Закрыть счет</option>
                                    <option value="block">Заблокировать счет</option>
                                    <option value="transfer_minus">Снять сумму</option>
                                    <option value="transfer_plus">Зачислить сумму</option>
                                    <option value="transfer_to">Перечислить клиенту</option>
                                </select>

                                {rows}

                                <div className={'text-right'}>
                                    <button className={'btn btn-primary'} type="submit">Выполнить</button>
                                </div>
                            </form>

                            <div style={{'marginBottom': '0px'}}>
                                {
                                    this.state.tableOn ? (
                                        <div>
                                            <button className={'btn btn-warning btn-outline'} onClick={function () {
                                                self.toggleTable ('test');
                                            }}>Скрыть таблицу</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className={'btn btn-success btn-outline'} onClick={function () {
                                                self.toggleTable ('test');
                                            }}>Открыть таблицу</button>
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

    toggleTable (param) {
        var state = this.state;
        state.tableOn = !state.tableOn;
        this.setState (state);
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
        if (num_acc) {
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
            if (!lastname || !firstname || !patronymic) {
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
                console.log(response.data)
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
                console.log(response.data)
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

        let state = this.state;

        let page = state.currentPage;
        if (name === "Prev" && page > 0) {
            state ['currentPage'] = --page;
            this.getTableView(page);
        }

        const pageLimit = 10;
        if (name === "Next" && page < (state.count_rows / pageLimit) - 1) {
            state ['currentPage'] = ++page;
            this.getTableView(page);
        }

        state [name] = value;
        this.setState (state);
    }

    getAccNumInput () {
        return (
            <div className={'m-b-20'}>
                <Cleave name="accnum" className={'form-control'} options={{creditCard: true}} type="text"
                        placeholder="Счет клиента"
                        onChange={this.handleInputChange}  autoComplete="off"/>
            </div>
        );
    }
}

export default MainWindow;
