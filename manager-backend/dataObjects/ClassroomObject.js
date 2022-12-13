// Prototype for a Classroom object

class ClassroomObject {
    constructor(name, schoolId, classTeacher, fees) {
      this.schoolId = schoolId;
      this.name = name;
      this.classTeacher = classTeacher;
      this.noOfStudents = 0;
      this.classFees = fees;
      this.totalFeesExpected = 0;
      this.totalFees = 0;
      this.createdAt = new Date;
      this.updatedAt = new Date;
    }
  }
  
  module.exports = ClassroomObject;