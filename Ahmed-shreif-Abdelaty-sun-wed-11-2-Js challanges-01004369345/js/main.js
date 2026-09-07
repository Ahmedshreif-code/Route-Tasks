/*
                                Challange 1
 Ask user for their name and age, then display a personalized message using console.log()
 */
// var userName = prompt("Enter your name")
// var userAge = prompt("Enter your age")
// var userBirthYear = 2026 - Number(userAge)
// console.log(`Hello ` + userName + `! You are ` + userAge + ` years old and you were born around ` + userBirthYear);
/*



                                Challange 2
Currency converter: get amount in EGP, convert to USD, EUR, GBP. USD=47.22, EUR=54.35, GBP=61.95
 */
// const USD = 47.22
// const Eur = 54.35
// const GBP = 61.95
// var amount = Number(prompt("Enter amount in EGP"))
// var amountInUSD = (amount / USD).toFixed(2)
// var amountInEur = (amount / Eur).toFixed(2)
// var amountInGBP = (amount / GBP).toFixed(2)

// console.log(
//     amount + " EGP = " + "$" + amountInUSD + " USD, €" + amountInEur + " EUR, £" + amountInGBP + " GBP"
// );



/*
                                Challange 3
Get a number from user, check if it's even or odd, display result
 */

// var num = Number(prompt("Enter the number"))
// if (num % 2 == 0) {
//     console.log(num + " is an even number");
// } else {
//     console.log(num + " is an odd number");
// }



/*
                                Challange 4
Declare a variable `hour` and assign it a number between 0 and 23. Use an `if-else if-else` statement to log "Good morning!" (0-11), "Good afternoon!" (12-17), or "Good evening!" (18-23)
 */

// var hour = Number(prompt("enter Number"))


// if (0 <= hour && hour <= 11) {
//     console.log("Good morning!")
// } else if (12 <= hour && hour <= 17) {
//     console.log("Good afternoon!")
// } else if (18 <= hour && hour <= 23) {
//     console.log("Good evening!")
// }



/*
                                Challange 5
Ask for three subject scores, calculate average and display pass/fail status (pass >= 50)
 */
// var Sub1 = Number(prompt("enter degree for sub1"))
// var Sub2 = Number(prompt("enter degree for sub1"))
// var Sub3 = Number(prompt("enter degree for sub1"))
// var avr = ((Sub1 + Sub2 + Sub3) / 3).toFixed(2)
// var status
// if (avr >= 50) {
//     status = "Pass"
//     console.log("Average: " + avr + ", " + "Status: " + status)
// } else {
//     status = "Fail"
//     console.log("Average: " + avr + ", " + "Status: " + status)
// }



/*
                                Challange 6
Get two numbers and an operator (+,-,*,/), perform calculation and display result
 */
// var num1 = Number(prompt("Enter num1"))
// var num2 = Number(prompt("Enter num2"))
// var operator = prompt("Enter operator betwen'+,-,*,/'")

// switch (operator) {
//     case "+": console.log(num1 + " " + operator + " " + num2 + " = " + Number(num1 + num2))
//         break
//     case "*": console.log(num1 + " " + operator + " " + num2 + " = " + num1 * num2)
//         break
//     case "-": console.log(num1 + " " + operator + " " + num2 + " = " + Number(num1 - num2))
//         break
//     case "/": console.log(num1 + " " + operator + " " + num2 + " = " + num1 / num2)
//         break
// }



/*
                                Challange 7
Get a number, print its multiplication table from 1 to 10 with formatting
 */
// var num = Number(prompt("Enter num"))
// for (var i = 1; i < 11; i++) {
//     console.log(num + " x " + i + " = " + num * i + "\n");
// }



/*
                                Challange 8
Use a `for` loop to print even numbers from 2 to 10
 */
// for (var i = 2; i <= 10; i += 2) {
//     console.log(i)
// }



/*
                                Challange 9
Use a `for` loop to calculate the factorial of 5 (5*4*3*2*1). Log the final result, not the intermediate steps
 */
// var result = 1
// for (var i = 5; i > 0; i--) {
//     result *= i
// }
// console.log(result)



/*
                                Challange 10
Use a `while` loop to find the smallest integer `n` such that `n * n` is greater than 50. Log `n`
 */
// var n = 1
// while (n * n < 50) {
//     n++
// }
// console.log(n)



/*
                                Challange 11
Get two numbers from user, swap their values without using a third variable, display them after swapping
 */

// var num1 = Number(prompt("Enter num1"))
// var num2 = Number(prompt("Enter num2"))
// num2 = num1 + num2
// num1 = num2 - num1
// num2 = num2 - num1

// console.log("After Swapping: num1=" + num1 + ", num2=" + num2)



/*
                                Challange 12
Get user age and ticket status, determine if can enter movie (age >= 18 OR hasTicket)
 */

// var age = Number(prompt("Enter age"))
// var hasTicket = prompt("Enter yes or no")

// if (age >= 18 || hasTicket == "yes") {
//     console.log("Access granted: true");
// } else {
//     console.log("Access granted: false");
// }



/*
                                Challange 13
Get three numbers, find and display the largest using nested if statements
 */
// var num1 = Number(prompt("Enter num1"))
// var num2 = Number(prompt("Enter num2"))
// var num3 = Number(prompt("Enter num3"))
// if (num1 > num2) {
//     if (num1 > num3) {
//         console.log("Largest number is: " + num1)
//     } else {
//         console.log("Largest number is: " + num3)

//     }
// } else if (num2 > num3) {
//     console.log("Largest number is: " + num2)
// } else {
//     console.log("Largest number is: " + num3)
// }



/*
                                Challange 14
Get three numbers, find and display the largest using nested if statements
 */
// var hoursWorked = Number(prompt("Enter hours you worked"))
// var hourlyRate = Number(prompt("Enter hourly Rate"))
// var overTime = 0
// var salary = 0
// if (hoursWorked > 40) {
//     overTime = (hoursWorked - 40) * 1.5 * hourlyRate
//     salary = 40 * hourlyRate
// } else {
//     salary = hoursWorked * hourlyRate
// }
// var totalSalary = overTime + salary
// console.log("Regular: $" + salary + ", Overtime: $" + overTime + ", Total: $" + totalSalary);



/*
                                Challange 15
BMI Calculator: get weight(kg) and height(m), calculate BMI, categorize. Categories: Underweight(<18.5), Normal(18.5-24.9), Overweight(25-29.9), Obese(30+)
 */
// var weight = Number(prompt("Enter weight"))
// var height = Number(prompt("Enter height"))
// var BMI = (weight / (height * height)).toFixed(2)
// if (BMI < 18.5) {
//     console.log("BMI: " + BMI + " - Underweight")
// } else if (BMI >= 18.5 && BMI <= 24.9) {
//     console.log("BMI: " + BMI + " - Normal weight")
// } else if (BMI >= 25 && BMI <= 29.9) {
//     console.log("BMI: " + BMI + " - Overweight")
// }
// else {
//     console.log("BMI: " + BMI + " - Obese")
// }



/*
                                Challange 16
Get purchase amount, calculate tax (10%), discount if > $100 (5% off), final price
 */
// var amount = Number(prompt("Enter amount"))
// var tax = amount * 0.1
// var discount = 0
// if (amount > 100) {
//     discount = 0.05 * amount
// }
// var totalPrice = amount + tax - discount
// console.log("Subtotal: $" + amount + ", Tax: $" + tax + ", Discount: $" + discount + ", Final: $" + totalPrice)



/*
                                Challange 17
Create a simple ATM: get operation (1:Balance, 2:Withdraw, 3:Deposit) and amount, process it
 */
// var operation = Number(prompt("select operation 1:Balance \n 2:Withdraw \n 3:Deposit"))

// switch (operation) {
//     case 1: {
//         var Balance = Number(prompt("Enter current Balance"))
//         console.log("Your balance is: $" + Balance);

//     }
//         break
//     case 2: {
//         var amount = Number(prompt("Enter amount"))
//         var Balance = Number(prompt("Enter current Balance"))
//         console.log("Withdrew $" + amount + ". New balance: $" + (Balance - amount));

//     }
//         break
//     case 3: {
//         var amount = Number(prompt("Enter amount"))
//         var Balance = Number(prompt("Enter current Balance"))
//         console.log("Deposited $" + amount + ". New balance: $" + (Balance + amount));

//     }
//         break
// }



/*
                                Challange 18
Print numbers 1-100, but for multiples of 3 print 'Fizz', for 5 print 'Buzz', for both print 'FizzBuzz'
 */
// for (var i = 1; i <= 100; i++) {
//     if (i % 3 == 0 && i % 5 == 0) {
//         console.log("FizzBuzz ")

//     } else if (i % 5 == 0) {
//         console.log("Buzz ")
//     } else if (i % 3 == 0) {
//         console.log("Fizz ")

//     } else {
//         console.log(i + " ")
//     }

// }



/*
                                Challange 19
The Left Triangular Star Pattern involves printing a series of stars in a left-aligned triangular shape. As you progress through the pattern, the number of stars per line increases incrementally, forming a triangular structure.
  *
  **
  ***
  ****
  *****
   */
// var rows = Number(prompt("Enter number of rows"))

// for (var i = 1; i <= rows; i++) {
//     var line = "\n"
//     for (var j = 1; j <= i; j++) {
//         line += "*"
//     }
//     console.log(line);


// }



/*
                                Challange 20
The Right Triangular Star Pattern involves printing a series of stars in a triangular shape, with each line having an incrementally increasing number of stars from left to right. This pattern is an excellent opportunity to practice loops and string concatenation in JavaScript.
    *
   **
  ***
 ****
*****
   */
// var rows = Number(prompt("Enter number of rows"))
// for (var i = 1; i <= rows; i++) {
//     var line = "\n"
//     for (var j = 1; j <= rows - i; j++) {
//         line += " "
//     }
//     for (var k = 1; k <= i; k++) {
//         line += "*"
//     }
//     console.log(line);

// }

