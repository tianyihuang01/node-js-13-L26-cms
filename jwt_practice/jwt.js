const jwt = require('jsonwebtoken');

const secret = 'secret';

const payload = {
	id: 1234,
};

const token = jwt.sign(payload, secret, { expiresIn: '1d' });

console.log(token);

const tokenToValidate =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjI0MDgzMDA0LCJleHAiOjE2MjQxNjk0MDR9.kAS7XTBeur9aiX-T-lG2Q_tDlymyvELznpculkfLUew';

const valid = jwt.verify(tokenToValidate, secret);

console.log(valid);
