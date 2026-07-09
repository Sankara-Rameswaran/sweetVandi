const request = require('supertest');
const app = require('../../app');

describe('Health Routes test', () => {
    test('BASIC GET TEST', async () => {
        const response = await request(app).get('/api/v1/health');
        expect(response.status).toBe(200);
        expect(response.body.success).toEqual('true');
    });
});
