const supertest = require('supertest');
const app = require('../../src/app');
const Student = require('../../src/models/student');
const { connectToDB, disconnectDB } = require('../../src/utils/db');

const request = supertest(app);

// test('1+1===2', () => {
// 	expect(1 + 1).toBe(2);
// });

describe('/students', () => {
	//hooks
	beforeAll(() => {
		connectToDB();
	});

	afterAll(async () => {
		await disconnectDB();
	});

	beforeEach(async () => {
		await Student.deleteMany({});
	});

	afterEach(async () => {
		await Student.deleteMany({});
	});

	describe('POST /', () => {
		const validStudent = {
			firstName: 'Tianyi',
			lastName: 'Wong',
			email: 'test@eg.com',
		};

		const createStudent = async (body) => {
			return request.post('/api/students').send(body);
		};

		it('should return 201 if request is valid', async () => {
			// connectToDB();
			const res = await createStudent(validStudent);
			// console.log(res.body);
			expect(res.statusCode).toBe(201);
			// await Student.deleteMany({});
		});

		it('should save student to database if request is valid', async () => {
			// connectToDB();
			const res = await createStudent(validStudent);
			const student = await Student.findOne({
				email: validStudent.email,
			}).exec();
			expect(student.firstName).toBe('Tianyi');
			expect(student.lastName).toBe('Wong');
			// await Student.deleteMany({});
		});

		it('should return 400 if email is missing', async () => {
			const res = await createStudent({
				firstName: 'Tianyi',
				lastName: 'Wong',
			});
			expect(res.statusCode).toBe(400);
		});

		it.each`
			field          | value
			${'firstName'} | ${undefined}
			${'lastName'}  | ${undefined}
			${'email'}     | ${undefined}
			${'firstName'} | ${'a'}
			${'email'}     | ${'@'}
			${'email'}     | ${'a@'}
			${'email'}     | ${'a@b'}
			${'email'}     | ${'a@b.c'}
		`('should return 400 when $field is $value', async ({ field, value }) => {
			const student = { ...validStudent }; //浅拷贝
			student[field] = value;
			const res = await createStudent(student);
			expect(res.statusCode).toBe(400);
		});
	});

	describe('GET /', () => {
		const validStudents = [
			{
				firstName: 'Ab',
				lastName: 'Bb',
				email: 'test@test.com',
			},
			{
				firstName: 'Ab',
				lastName: 'Ab',
				email: 'test@test.com',
			},
			{
				firstName: 'Ca',
				lastName: 'Bb',
				email: 'test@test.com',
			},
		];

		const getStudent = async () => {
			// await Student.insertMany(validStudents);
			return request.get('/api/students');
		};

		beforeEach(async () => {
			await Student.insertMany(validStudents);
			// console.log('done!!!');
		});

		it('should return all students', async () => {
			const res = await getStudent();
			// console.log(res.body);
			expect(res.status).toBe(200);
			// expect(res.body).toEqual(expect.arrayContaining(validStudents));
			expect(res.body.length).toBeGreaterThanOrEqual(3);
			expect(res.body[0]).toHaveProperty('firstName');
		});
	});
});
