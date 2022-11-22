import Service from './Service'

const resource = '/sanctum';

export default {
    csrfCookie() {
        return Service.get(`${resource}/csrf-cookie`);
    }
}
