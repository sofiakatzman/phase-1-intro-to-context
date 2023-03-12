
let createEmployeeRecord = function(row){
    return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    
    return employee
}

let hoursWorkedOnDate = function(employee, queryDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === queryDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === queryDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, queryDate){
    let employeeWage = employee.payPerHour
    let wagesForDate = hoursWorkedOnDate(employee, queryDate) * employeeWage
    return wagesForDate
}
