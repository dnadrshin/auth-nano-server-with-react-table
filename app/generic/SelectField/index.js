
import _ from 'lodash';
import React from 'react';
import { Field } from 'react-redux-form';
import { connect } from 'react-redux';

const SelectFiled = ({path, model, option, list, value, listModel}) => <Field model={model}>
    <select>
        {list.map(el => <option value={el[value]} key={el[value]}>{el[option]}</option>)}
    </select>
</Field>

export default connect(
    (state, props) => ({
        list: _.get(state, props.listModel)
    })
)(SelectFiled);