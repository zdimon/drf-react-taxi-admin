/* eslint react/jsx-key: off */
import React from 'react';
import { useTranslate } from 'react-admin';

const RiderTitle = ({ record }) => {
    const translate = useTranslate();
    return (
        <span>
            {record ? translate('user.edit.title', { title: record.name }) : ''}
        </span>
    );
};

export default RiderTitle;
