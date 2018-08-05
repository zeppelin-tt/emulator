import axios from "axios/index";

export const accsGenerator = (quantity = 3, callback) => {
    if (callback) return Array.from({length: quantity}, callback);

    // if no given callback, retrun default format.
    return (
        Array.from({length: quantity}, (value, index) => ({
            numAcc: 100000000000 + index,
            fio: `ФИО ${index}`,
            balance: 1 + index,
            // create_time: new Date(2011, 0, {index})
        }))
    );
};

// axios.post('http://localhost:8080/rest/account/action', JSON.stringify(sendData), header)
//     .then((response) => {
//         console.log(response);
//         if (response.data['success'] === 'true') {
//             alert("Операция " + this.state.text + " выполнена успешно!")
//         } else {
//             alert(response.data['message'])
//         }
//     })
//     .catch((error) => {
//         alert("Дерьмо случается!")
//     });

//Получение CSV по ID
export const arrayToTable = () =>  {

    axios.get('http://localhost:8080/rest/account/view')
        .then((response) => {
            return response;
            // if (response.data['success'] === 'true') {
            //     const json_str = response.data['data'];
            // } else {
            //     alert(response.data['message'])
            // }
    }).catch((error) => {
        alert("Дерьмо случается и с табличкой!")
    });
};

// export const tableView = (quantity = 6, callback) => {
//     if (callback) return Array.from({length: quantity}, callback);
//
//     return (
//         Array.from()
//     )
// }
