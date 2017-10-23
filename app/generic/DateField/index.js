
import _ from 'lodash';
import React from 'react';
import { actions, Field } from 'react-redux-form';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import style from 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const
    DateFiled = ({date, dateHandler, path, model,
        option, list, value, listModel}) => <Field model="record">
        <DatePicker
            selected={date}
            onChange={e => dateHandler(moment(e))}
            placeholderText="Date"
            dateFormat="DD-MM-YYYY"
        />
    </Field>;

export default connect(
    (state, props) => ({
        date: _.get(state, props.model),
    }),
    (dispatch, props) => ({
        dateHandler: value => dispatch(actions.change(props.model, value)),
    }),
)(DateFiled);
