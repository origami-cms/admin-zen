import _ from 'lodash';
export const toForm = properties => {
    const ui = {};
    const newProps = _.mapValues(properties, (v, k) => {
        v.title = v.label;
        delete v.label;

        switch (v.type) {
            case 'array':
                v.items = v.children;
                delete v.children;
                ui[k] = {
                    'items': {
                        'ui:emptyValue': ''
                    }
                };
                break;
            case 'textarea':
                v.type = 'string';
                ui[k] = {'ui:widget': 'textarea'};
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
