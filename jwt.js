const jwt = require('jsonwebtoken');

let id = '100';
const secret = 'supersecret';

const token = jwt.sign(id,secret);
const decodedToken = jwt.verify('eyJhbGciOiJIUzI1NiJ9.MTAw._p4CTP9MejT8kntvqaJI0HR_jo2DLfuLaRqCIahBf54',secret);

console.log(decodedToken)