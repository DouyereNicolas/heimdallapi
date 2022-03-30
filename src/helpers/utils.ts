
export const getDateForInput = (date: Date) => {
    let start = new Date(date);
    let y = start.getFullYear();
    let m = start.getMonth();
    m += 1;
    let d = start.getDate();
    let dateStart: string;
    if( m < 10 && d < 10) {
        dateStart = y + '-0' + m + '-0' + d;
    }else if ( m < 10 ){
        dateStart = y + '-0' + m + '-' + d;
    }else if ( d < 10){
        dateStart = y + '-' + m + '-0' + d;
    }else{
        dateStart = y + '-' + m + '-' + d;
    }
    return dateStart
}

