import { measure } from "helpful-decorators";
// helpful-decorators are experimental features => tsc --experimentalDecorators => we have to use to compile and build. we can use these decorators on class level, method level and variable level as well. (@measure id)

class DateClass {
  // properties of class, sometimes the properties can be created during the construction of the object (inside constructor)
  private timeZone: string;
  constructor(timeZone: string) {
    // every time a new instance of the class is created, the control reaches here
    this.timeZone = timeZone;
  }
  @measure // method level
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
    console.log(
      `Total time taken for the operation : -  ${endTime - startTime} ms`
    );
  }
}

const dateObject = new DateClass("IN");
console.log(dateObject.getTime());
console.log(dateObject.getTime());
console.log(dateObject.getTime());
console.log(dateObject.getTime());
console.log(dateObject.getTime());
// console.log(dateObject.getMonth());
// console.log(dateObject.getTimezone());
// dateObject.expensiveOperation();
