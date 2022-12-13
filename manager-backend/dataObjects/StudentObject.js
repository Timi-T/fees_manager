// Prototype for a Student object

class StudentObject {
    constructor(fullname, age, sex, phoneNo, discount, classroom, schoolId) {
      this.fullname = fullname;
      this.age = age;
      this.sex = sex;
      this.phoneNo = phoneNo;
      this.discount = discount;
      this.classroom = classroom;
      this.schoolId = schoolId;
      this.totalFeesExpected = 0;
      this.totalPaidFees = 0;
      this.createdAt = new Date;
      this.updatedAt = new Date;
    }
  }
  
  module.exports = StudentObject;