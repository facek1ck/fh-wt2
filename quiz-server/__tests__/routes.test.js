//routes.test.js

const
    request = require('supertest'),
    fs = require('mz/fs'),
    server = require('../server.js'),
    path = require('path');


beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});

// close the server after each test
afterAll(() => {
    server.close();
    console.log('server closed!');
});



describe('basic REST GET tests', () => {

    test('get home route GET /', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Server is alive and running');
    });

    test('get all users GET /users', async () => {
        const
            users = "Gabriel",
            response = await request(server).get('/users');

        expect(response.text).toContain(users);
        expect(response.status).toEqual(200);
    });

    test('get one user GET /users/:userid', async () => {
        const response = await request(server).get('/users/1');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Asherov');
    });

    test('get open tests of user GET /users/:userid/open', async () => {
        const response = await request(server).get('/users/1/open');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('A');
    });

    test('get user by name GET /tests/:name', async () => {
        const 
            question = "Bliny sind die russische Version von ... ?"; 
            response = await request(server).get('/tests/Essen');

        expect(response.status).toEqual(200);
        expect(response.text).toContain(question);
    });

    test('get sample question GET /tests/:name/questions', async () => {
        const 
            question = "Sie möchten vermeiden, Eier von Legebatteriehennen zu kaufen. Welche Ziffer auf dem Ei steht für Käfighaltung?",
            response = await request(server).get('/tests/Essen/questions');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(question);
    });

    test('get specific question by id GET /tests/:name/questions/:id', async () => {
        const response = await request(server).get('/tests/Essen/questions/1');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Vitamin A');
    });


    //online user test - cannot check cause user may be offline
    /* test('get currently online users GET /requests/online', async () => {
        const response = await request(server).get('/requests/online');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('2');
    }); */

    //server must be running
    test('get GET /evaluation/:testID', async () => {
        const response = await request(server).get('/evaluation/1');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('');
    });


}); 


describe('basic REST POST tests', () => {

    
     const filePath = path.join(__dirname, '../testFiles/test.file');
     let testFilePath = null;
 
     // Upload first test file to CDN
     it('should upload the test file to CDN', () =>
         // Test if the test file is exist
         fs.exists(filePath)
             .then((exists) => {
                 if (!exists) throw new Error('file does not exist');
                 return request(server)
                     .post('/tests/Asherov/upload')
                     .attach('55CHbmatnFYH6UYy', filePath)
                     .then((res) => {
                         const { success, message, filePath } = res.body;
                         expect(success).toBeTruthy();
                         expect(message).toBe('successfully uploaded result');
                     })
                     .catch(err => console.log(err));
             }));
             

}); 
