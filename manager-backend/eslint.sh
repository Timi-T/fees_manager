#!/bin/bash

# LINTING CHECK FOR BACKEND FILES
#============================================#

# Run eslint on files in main directory
npx eslint server.js

# Run eslint on files in controller directory
npx eslint controllers/UserController.js
npx eslint controllers/AuthController.js
npx eslint controllers/ClassController.js
npx eslint controllers/PaymentController.js
npx eslint controllers/SchoolController.js
npx eslint controllers/StudentController.js

# Run eslint on files in dataObjects directory
npx eslint dataObjects/ClassroomObject.js
npx eslint dataObjects/PaymentObject.js
npx eslint dataObjects/SchoolObject.js
npx eslint dataObjects/StudentObject.js
npx eslint dataObjects/UserObject.js

# Run eslint on files in routes directory
npx eslint routes/index.js

# Run eslint on files in utils directory
npx eslint utils/db.js
npx eslint utils/redis.js

#============================================#