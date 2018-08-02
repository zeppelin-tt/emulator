import {dateFilter, numberFilter, textFilter} from "react-bootstrap-table2-filter";

/**
 * accs generator for stories
 *
 * @param {Number} quantity - quantity of products
 * @param {Function} callback - callback func which is similiar to 'mapFunction'
 * aims to customize product format
 *
 * @return {Array} - accs array
 */
export const accsGenerator = (quantity = 5, callback) => {
    if (callback) return Array.from({length: quantity}, callback);

    // if no given callback, retrun default format.
    return (
        Array.from({length: quantity}, (value, index) => ({
            numAcc: 100000000000 + index,
            fio: `ФИО ${index}`,
            balance: 1 + index,
            create_time: new Date(2011, 0, {index})
        }))
    );
};
