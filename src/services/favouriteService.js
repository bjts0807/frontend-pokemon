import Service from "./Service";
const baseurl = '/api/favourite';

export default {
    index() {
        return Service.get(`${baseurl}`);
    },
    store(obj) {
        return Service.post(`${baseurl}/store`, obj);
    },
    show(id) {
        return Service.get(`${baseurl}/show/${id}`);
    },
    /* search(params) {
        return Service.get(`${baseurl}/search`,obj);
    }, */
    search(expr){
        return Service.get(`${baseurl}/search`, {
            params : {
                url : expr
            }
        });
    },
}