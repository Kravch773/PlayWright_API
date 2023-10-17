import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helper/apiHelper';
import { title } from 'process';

test.describe('Api testing', () => {
    let userId ="652cf544f92dd699e3862078";
    let apiHelper;
    let title = "mr"
    let firstName;
    let lastName;
    let email;

    test.beforeAll(async ({ request }) => {
        apiHelper = new ApiHelper(request);
        firstName = await apiHelper.randomString(7);
        lastName = await apiHelper.randomString(10);
        email = await apiHelper.randomString(15) + '@mail.com';
    });
    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });
    test('Post Request - Create New User', async ({ request }) => {
        let response = await apiHelper.postRequestCreateNewUser(title,firstName,lastName,email);
        expect(response.status()).toBe(200);
        userId = await (await apiHelper.getParsedResponse(response)).id
    });
    test('Get Request - get User by id and verify data', async () => {
        let response = await apiHelper.getRequestUserListById(userId);
        expect(response.status()).toBe(200);
        let responseParsed = await apiHelper.getParsedResponse(response);
        expect(await responseParsed.id).toBe(userId);
        expect(await responseParsed.title).toBe(title);
        expect(await responseParsed.firstName).toBe(firstName);
        expect(await responseParsed.lastName).toBe(lastName);
        expect(await responseParsed.email).toBe(email);
    });
    test('Delete Request - delete created User', async ({ request }) => {
        let response = await apiHelper.deleteRequestUserById(userId);
        expect(response.status()).toBe(200);
        expect(await (await apiHelper.getParsedResponse(response)).id).toBe(userId);
    });
    test('Delete Request - Trying to delete with deleted user', async ({ request }) => {
        let response = await apiHelper.deleteRequestUserById(userId);
        expect(response.status()).toBe(404);
        expect(await (await apiHelper.getParsedResponse(response)).error).toBe('RESOURCE_NOT_FOUND');
    });
});
