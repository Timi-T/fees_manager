// Prototype for a Classroom object

class ClassroomObject {
  constructor(
    depositorName,
    email,
    studentName,
    studentId,
    studentClass,
    amount,
    purpose,
    schoolId,
    refNo,
    status,
    message,
    transactionNo,
  ) {
    this.depositorName = depositorName;
    this.email = email;
    this.studentName = studentName;
    this.studentId = studentId;
    this.studentClass = studentClass;
    this.amount = amount;
    this.purpose = purpose;
    this.schoolId = schoolId;
    this.referenceNo = refNo;
    this.status = status;
    this.paymentMessage = message;
    this.transactionNo = transactionNo;
    this.createdAt = new Date;
  }
}
  
module.exports = ClassroomObject;
