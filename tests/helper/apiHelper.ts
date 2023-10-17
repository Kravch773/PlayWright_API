import {APIRequestContext, APIResponse} from "playwright";

let defBaseUrl = "https://dummyapi.io/data/v1"

export class ApiHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getParsedResponse(apiResponse: APIResponse):Promise<any> {
        return await JSON.parse(await apiResponse.text());
    }
    async getRequestUserListById(userId): Promise<APIResponse> {
        return await this.request.get(defBaseUrl+'/user/' + userId);
    }
    async postRequestCreateNewUser(title,firstName,lastName,email): Promise<APIResponse> {
        return await this.request.post(defBaseUrl+'/user/create', {
            data: {
                title: title,
                firstName: firstName,
                lastName: lastName,
                email: email,
            },
        });
    }
    async deleteRequestUserById(userId): Promise<APIResponse> {
        return await this.request.delete(defBaseUrl+'/user/' + userId);
    }
    async randomString(length: number): Promise<string> {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

}