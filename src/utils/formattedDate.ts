// 对日期进行格式化
// 原日期格式为：2021-08-01T00:00:00.000Z
// 格式化后的日期格式为：2021年8月1日00：00
const formattedDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    return `${year}年${month}月${day}日${hour}:${minute}`;
};

export default formattedDate;