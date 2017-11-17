import {
    PAGE_PROPERTIES_SET,
    PAGE_DATA_SET
} from 'actions/const';

import resource from 'lib/Resource/reducer';


export default resource('pages', (state, action) => {
    let pageIndex;
    if (action.id) {
        pageIndex = state.pages.findIndex(page => {
            if (page.id == action.id) return page;
        });
    }
    switch (action.type) {
        case PAGE_PROPERTIES_SET:
            return state.setIn(
                ['pages', pageIndex, 'properties'],
                action.properties
            );

        case PAGE_DATA_SET:
            return state.setIn(
                ['pages', pageIndex, 'data'],
                action.data
            );

        default:
            return state;
    }
});
