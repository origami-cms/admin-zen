import {
    PAGE_PROPERTIES_SET,
    PAGE_DATA_SET,
    PAGES_TREE_SET
} from './const';
import API from 'lib/API/API';
import resource from 'lib/Resource/actions';


export const {
    pagesCreate,
    pagesGet,
    pagesUpdate,
    pagesRemove
} = resource('pages');


export const pagesPropertiesGet = id =>
    async dispatch => {
        const {data: properties} = await API.get(`/pages/${id}/properties`);
        dispatch({type: PAGE_PROPERTIES_SET, id, properties});
    };


export const pagesDataUpdate = (id, data) =>
    async dispatch => {
        await API.put(`/pages/${id}/properties`, data);
        dispatch({type: PAGE_DATA_SET, id, data});
    };


export const pagesTreeGet = (parent = '') =>
    async dispatch => {
        const {data: pages} = await API.get(`/pages/tree/${parent}`);
        dispatch({type: PAGES_TREE_SET, parent, pages});
    };

export const pagesTreeMove = (pages, parent) =>
    () => {
        const execs = [];
        pages.forEach(p => {
            execs.push(API.post(`/pages/${p.id}/move`, {parent}));
        });

        return Promise.all(execs);

        // Dispatch({type: PAGES_TREE_SET, parent, pages});
    };
