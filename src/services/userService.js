import Service from "./Service";
const baseurl = '/api/users';
import {isEmpty} from 'lodash';
export default {
    
    async index(search = '',pagination = {}) {
        let url = `${baseurl}/?`;

        url += search !== '' ? `s=${search}` : '';

        url += (!isEmpty(pagination))
            ? `&paginate=true&per_page=${pagination.per_page}&page=${pagination.page}`
            : '';

        return Service.get(url);
    },
    store(obj) {
        return Service.post(`${baseurl}/store`, obj);
    },
    show(id) {
        return Service.get(`${baseurl}/show/${id}`);
    },
    update(obj) {
        return Service.put(`${baseurl}/update`, obj);
    },
    delete(id) {
        return Service.delete(`${baseurl}/delete/${id}`);
    },
}