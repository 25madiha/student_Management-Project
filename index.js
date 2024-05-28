#! /user/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    courseEnrolled;
    feesAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
let basedId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "answer",
        message: "Please select an option: \n",
        choices: ["Enroll a student", "show students status"]
    });
    if (action.answer === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "answer",
            message: "Please Enter your name:"
        });
        let trimmedstudentName = (studentName.answer).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedstudentName) === false) {
            if (trimmedstudentName !== "") {
                basedId++;
                studentId = "STD" + basedId;
                console.log("\n\tYour account has been created");
                console.log(`Welcome, ${trimmedstudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "answer",
                    message: "Please select a course",
                    choices: ["IT", "English", "Cooking"]
                });
                let courseFees = 0;
                switch (course.answer) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 5000;
                        break;
                    case "Cooking":
                        courseFees = 200;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "answer",
                    message: "Do you want to Enroll in this course"
                });
                if (courseConfirm.answer === true) {
                    let Student = new student(studentId, trimmedstudentName, [course.answer], courseFees);
                    students.push(Student);
                    console.log("you have enrolled in this course");
                }
            }
            else {
                console.log("invalid Name");
            }
        }
        else {
            console.log("this name is already exists");
        }
    }
    else if (action.answer === "show students status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "answer",
                message: "Please select name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.answer);
            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "answer",
        message: "DO you want to continue?"
    });
    if (userConfirm.answer === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
