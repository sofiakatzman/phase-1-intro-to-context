function createEmployeeRecord(array){
    array.firstName = array[0];
    array.familyName = array[1];
    array.title = array[2];
    array.payPerHour = array[3];
    array.timeInEvents = [];
    array.timeOutEvents = [];
    return array
}

function createEmployeeRecords(arrays){ //argument = array of arrays
    return arrays.map(function(array) {
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employeeObject, punchTimeIn){
let [date, time] = punchTimeIn.split(" ");
employeeObject.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time, 10),
    date,     
})
    return employeeObject
}

function createTimeOutEvent(employeeObject, punchTimeOut){
    let [date, time] = punchTimeOut.split(" ");
    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date,     
    })
        return employeeObject
}

function hoursWorkedOnDate(employee, queryDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === queryDate
   })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === queryDate
    })
    
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, queryDate){
   return employee.payPerHour * hoursWorkedOnDate(employee, queryDate)
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(aggregated, rec){
          return aggregated + allWagesFor(rec)
      }, 0)
  }
