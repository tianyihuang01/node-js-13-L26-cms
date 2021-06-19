const app = require('./src/app');
const { connectToDB } = require('./src/utils/db');

const PORT = process.env.PORT || 3000;

connectToDB();

app.listen(PORT, () => {
	console.log(`localhost server is listening on port ${PORT}!`);
});
