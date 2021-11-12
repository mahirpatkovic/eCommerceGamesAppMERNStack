class Utils {
    static formatDate(date) {
        if (date === '0001-01-01T00:00:00Z') {
            return 'N/A';
        }
        let new_date = new Date(date);
        let new_day = new_date.getDate();
        let new_month = new_date.getMonth() + 1;

        if (new_day < 10) {
            new_day = '0' + new_day;
        }
        if (new_month < 10) {
            new_month = '0' + new_month;
        }
        return (
            new_day +
            '.' +
            new_month +
            '.' +
            new_date.getFullYear() +
            ' - ' +
            new_date.getHours() +
            ':' +
            new_date.getMinutes()
        );
    }
}

export default Utils;
