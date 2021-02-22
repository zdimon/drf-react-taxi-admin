/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import {
    CloneButton,
    DeleteWithConfirmButton,
    Edit,
    FormTab,
    required,
    SaveButton,
    // SelectInput,
    ImageInput,
    ImageField,
    ShowButton,
    BooleanInput,
    TabbedForm,
    TextInput,
    Toolbar,
    TopToolbar,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import CarTitle from './CarTitle';
// import Aside from './Aside';

const useToolbarStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

/**
 * Custom Toolbar for the Edit form
 *
 * Save with undo, but delete with confirm
 */
const CarEditToolbar = props => {
    const classes = useToolbarStyles();
    return (
        <Toolbar {...props} classes={classes}>
            <SaveButton />
            <DeleteWithConfirmButton />
        </Toolbar>
    );
};

const EditActions = ({ basePath, data, hasShow }) => (
    <TopToolbar>
        <CloneButton
            className="button-clone"
            basePath={basePath}
            record={data}
        />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

const CarEdit = ({ permissions, ...props }) => (
    <Edit
        title={<CarTitle />}
        actions={<EditActions />}
        {...props}
    >
        <TabbedForm
            initialValue={{ role: 'user' }}
            toolbar={<CarEditToolbar />}
        >
            <FormTab label="user.form.summary" path="">
                {permissions === 'admin' && <TextInput disabled source="id" />}
                <TextInput
                    source="name"
                    validate={required()}
                />
                <TextInput
                    source="number"
                    multiline
                />
                
                <ImageInput source="image" label="Related pictures" accept="image/*">
                    <ImageField source="image" title="title" />
                </ImageInput>
            </FormTab>
           
        </TabbedForm>
    </Edit>
);

CarEdit.propTypes = {
    id: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default CarEdit;
