//目标得到1个月的数据，返回35或42的数组,对比日期的月份,和本月相同就是正常,不同就置灰。
//参数年月，输出对象二维数组 一维数组为周,单对象 年 月 日 星期 四个字段 
//得到当前是多少学期周，参数：开学日期 
function oneMonthData(year,month){
    //某个月的完整数据，不包括前后缀
    const MONTH=[]
    // const WEEK_STR=[ '日','一', '二', '三', '四', '五', '六']
    const dayIsTheFrist=new Date(year,month-1,1).getDay()
    const daysTotalInMonth=new Date(year,month,0).getDate()
    for(let i=1;i<=daysTotalInMonth;i++){
        const DAY={
            year,
            month,
            date:i,
            day:(i-1+dayIsTheFrist)%7,
            // dayStr:WEEK_STR[(i-1+dayIsTheFrist)%7]
        }
        //结论：每月中的一天减一,再加上月初的星期号对7取余就是这天的星期号。
        MONTH.push(DAY)
    }
    return MONTH    
}

function RectMonthData(year,month){
     //某个月的完整数据，包括前后缀
    const MONTH=oneMonthData(year,month)
    const currentMonth=MONTH[0].month
    const currentYear=MONTH[0].year
    let lastMonth,nextMonth,lastMonthYear,nextMonthYear=''
    //处理跨年的情形
    if(currentMonth===1){
        lastMonth=12
        nextMonth=2
        lastMonthYear=currentYear-1
        nextMonthYear=currentYear
    }else if(currentMonth===12){
        lastMonth=12
        nextMonth=2
        lastMonthYear=currentYear
        nextMonthYear=currentYear+1
    }else{
        lastMonth=currentMonth-1
        nextMonth=currentMonth+1
        lastMonthYear=currentYear
        nextMonthYear=currentYear
    }
    const headCount=MONTH[0].day
    const tailCount=MONTH[MONTH.length-1].day
    const headCountList=oneMonthData(lastMonthYear,lastMonth).slice((-1-headCount),-1)
    const tailCountList=oneMonthData(nextMonthYear,nextMonth).slice(0,(6-tailCount))
    MONTH.unshift(...headCountList)
    MONTH.push(...tailCountList)
    var result=[]
    for (let i=0;i<=MONTH.length;i+=7){
        result.push(MONTH.slice(i,i+7))
    }
    return result
}

module.exports={
    oneMonthData:oneMonthData,
    RectMonthData:RectMonthData
}