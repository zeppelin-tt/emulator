
export const accsGenerator = (quantity = 5, callback) => {
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
