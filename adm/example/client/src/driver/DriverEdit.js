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
    ReferenceManyField,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton

} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import DriverTitle from './DriverTitle';
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
const DriverEditToolbar = props => {
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

const DriverEdit = ({ permissions, ...props }) => (
    <Edit
        title={<DriverTitle />}
        actions={<EditActions />}
        {...props}
    >
        <TabbedForm
            initialValue={{ role: 'user' }}
            toolbar={<DriverEditToolbar />}
        >
            <FormTab label="user.form.summary" path="">
                {permissions === 'admin' && <TextInput disabled source="id" />}
                <TextInput
                    source="name"
                    initialValue="slim shady"
                    validate={required()}
                />
                <TextInput
                    source="desc"
                    initialValue="description"
                    multiline
                />
                <BooleanInput label="Is active" source="active" />
                <ImageInput source="image" label="Related pictures" accept="image/*">
                    <ImageField source="image" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="driver.cars" path="">
                <ReferenceManyField
                        addLabel={false}
                        reference="car"
                        target="driver"
                    >
                    <Datagrid>
                        <ImageField source="small_image_url" title="title" />
                        <TextField source="name" />
                        <TextField source="number" />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);

DriverEdit.propTypes = {
    id: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default DriverEdit;
