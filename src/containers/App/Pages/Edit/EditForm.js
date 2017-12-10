import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';


import {Form} from 'components/ui';


import actions from 'actions';


export class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.formSchema = {
            'Page settings': [
                {
                    type: 'text',
                    label: 'Title',
                    name: 'title'
                },
                {
                    type: 'url',
                    label: 'Url',
                    name: 'url'
                }
            ],
            'Page template settings': Object.entries(this.props.page.properties).map(([name, field]) => {
                field.name = `props_${name}`;

                return field;
            }),
            'Save': [{
                type: 'submit',
                value: 'Save'
            }]
        };
    }

    get values() {
        // BUG: Recursive
        const page = _.cloneDeep(this.props.page);
        page.data = _.mapKeys(page.data, (value, key) => `props_${key}`);

        return {...page, ...page.data};
    }

    render() {
        return (
            <div>
                <Form
                    className="full-field-width"
                    fields={this.formSchema}
                    onSubmit={this.save.bind(this)}
                    values={this.values}
                />
            </div>
        );
    }

    save(values) {
        const v = _.cloneDeep(values);
        // Convert the props_prop to just prop
        Object.keys(v.data).forEach(k => {
            const split = (/props_(.+)/).exec(k);
            if (!split) return;
            const [, _k] = split;
            v.data[_k] = v[k];
            delete v.data[k];
            delete v[k];
        });

        this.props.actions.pagesUpdate(v.id, v);
    }
}

const mapStateToProps = () => ({

});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Pages
    }, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(EditForm);
