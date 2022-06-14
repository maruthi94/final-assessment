const db = require('./db');
const app = require('../src/index');
const userService = require('../src/services/user');
const superTest = require('supertest');
const jwt = require('jsonwebtoken');

describe("#Unit test -  User API's", () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.closeDatabase();
    });

    describe('POST /api/users/create', () => {
        afterEach(async () => db.clearDatabase());
        it('should create user in db and return create user with http status 201', async () => {
            const user = {
                firstName: 'james',
                lastName: 'bond',
                email: 'james.bond@gmail.com',
                password: 'pwd@1234',
            };
            await superTest(app)
                .post('/api/users/create')
                .send(user)
                .expect(201)
                .then(res => {
                    const { password, ...userWithoutPassword } = user;
                    expect(userWithoutPassword).toEqual(res.body);
                });
        });

        it('should hash password before create user in db and return create user with http status 201', async () => {
            const user = {
                firstName: 'james',
                lastName: 'bond',
                email: 'james.bond@gmail.com',
                password: 'pwd@1234',
            };
            await superTest(app)
                .post('/api/users/create')
                .send(user)
                .expect(201)
                .then(async res => {
                    const savedUser = await userService.findByEmail(user.email);
                    expect(user.password).not.toBe(savedUser.password);
                });
        });

        it('should not create user in db if user with email already exists and return error response with http status 409', async () => {
            const user = {
                firstName: 'james',
                lastName: 'bond',
                email: 'james.bond@gmail.com',
                password: 'pwd@1234',
            };
            await userService.save(user);
            await superTest(app)
                .post('/api/users/create')
                .send(user)
                .expect(409)
                .then(async res => {
                    const expectedMessage =
                        'An account with email james.bond@gmail.com is already exists.';
                    const { error } = res.body;
                    expect(error).toBe(expectedMessage);
                });
        });
    });

    describe('POST /api/users/login', () => {
        const user = {
            firstName: 'james',
            lastName: 'bond',
            email: 'hello.world@gmail.com',
            password: 'pwd@1234',
        };
        beforeEach(async () => {
            await userService.save(user);
        });
        afterEach(async () => db.clearDatabase());

        it('should return 200 OK status if email and password is verified successfully', async () => {
            await superTest(app)
                .post('/api/users/login')
                .send({ email: user.email, password: user.password })
                .expect(200)
                .then(res => {
                    const { token } = res.body;

                    const decoded = jwt.decode(token);
                    expect(decoded.firstName).toBe(user.firstName);
                    expect(decoded.lastName).toBe(user.lastName);
                    expect(decoded.email).toBe(user.email);
                });
        });

        it('should return 403 forbidden status if email and password is not verified successfully', async () => {
            await superTest(app)
                .post('/api/users/login')
                .send({ email: user.email, password: 'test123456' })
                .expect(403)
                .then(res => {
                    const { error } = res.body;

                    expect(error).toBe('Incorrect password');
                });
        });

        it('should return 400 BadRequest status if no user found for email', async () => {
            await superTest(app)
                .post('/api/users/login')
                .send({ email: 'test@u.com', password: 'test123456' })
                .expect(400)
                .then(res => {
                    const { error } = res.body;

                    expect(error).toBe('User does not exist');
                });
        });
    });
});
