// Prototype for a School object

class SchoolObject {
  constructor(ownerId, name, address, level, noOfClassrooms = 0) {
    this.ownerId = ownerId;
    this.name = name;
    this.address = address;
    this.level = level;
    this.createdAt = new Date;
    this.updatedAt = new Date;
    this.noOfClassrooms = noOfClassrooms;
    this.noOfStudents = 0;
    this.totalFees = 0;
  }
}

module.exports = SchoolObject;