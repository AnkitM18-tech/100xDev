"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpful_decorators_1 = require("helpful-decorators");
class DateClass {
    constructor(timeZone) {
        // every time a new instance of the class is created, the control reaches here
        this.timeZone = timeZone;
    }
    getTime() {
        let d = new Date();
        console.log("Hello world!");
        return d.getTime();
    }
    getMonth() {
        let d = new Date();
        return d.getMonth() + 1;
    }
    getTimezone() {
        return this.timeZone;
    }
    expensiveOperation() {
        let startTime = this.getTime();
        let count = 0;
        for (let i = 0; i < 1000000; i++) {
            count++;
        }
        let endTime = this.getTime();
        console.log(`Total time taken for the operation : -  ${endTime - startTime} ms`);
    }
}
__decorate([
    helpful_decorators_1.measure
], DateClass.prototype, "getTime", null);
const dateObject = new DateClass("IN");
console.log(dateObject.getTime());
console.log(dateObject.getTime());
console.log(dateObject.getTime());
console.log(dateObject.getTime());
console.log(dateObject.getTime());
// console.log(dateObject.getMonth());
// console.log(dateObject.getTimezone());
// dateObject.expensiveOperation();
