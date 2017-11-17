import _ from 'lodash';
export const toForm = properties => {
    const ui = {};
    const required = [];
    const newProps = _.mapValues(_.cloneDeep(properties), (v, k) => {
        v.title = v.label;
        delete v.label;

        if (v.type === 'array') {
            v.items = v.children;
            delete v.children;
            ui[k] = {
                'items': {
                    'ui:emptyValue': ''
                }
            };
        }

        return v;
    });

    return {
        ui,
        schema: {
            type: 'object',
            required: Object.keys(newProps),
            properties: newProps
        }
    };
};
