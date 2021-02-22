/* eslint react/jsx-key: off */
import React from 'react';
import {
    Create,
    FormTab,
    SaveButton,
    AutocompleteInput,
    TabbedForm,
    TextInput,
    Toolbar,
    BooleanField,
    required,
} from 'react-admin';

// import Aside from './Aside';

const DriverEditToolbar = ({
    permissions,
    hasList,
    hasEdit,
    hasShow,
    hasCreate,
    ...props
}) => (
    <Toolbar {...props}>
        <SaveButton
            label="driver.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        {permissions !== 'admin' && (
            <SaveButton
                label="driver.action.save_and_add"
                redirect={false}
                submitOnEnter={false}
                variant="text"
            />
        )}
    </Toolbar>
);

const DriverCreate = ({ permissions, ...props }) => (
    <Create {...props} >
        <TabbedForm
            toolbar={<DriverEditToolbar permissions={permissions} {...props} />}
        >
            <FormTab label="driver.form.summary" path="">
                <TextInput
                    source="name"
                    autoFocus
                    validate={required()}
                />
                <TextInput
                    source="password"
                    validate={required()}
                />
                <TextInput
                    source="desc"
                    validate={required()}
                />
                <BooleanField
                    source="active"
                    validate={required()}
                />
            </FormTab>
            {permissions !== 'admin' && (
                <FormTab label="user.form.security" path="security">
                    <AutocompleteInput
                        source="role"
                        choices={[
                            { id: '', name: 'None' },
                            { id: 'admin', name: 'Admin' },
                            { id: 'user', name: 'User' },
                            { id: 'user_simple', name: 'UserSimple' },
                        ]}
                    />
                </FormTab>
            )}
        </TabbedForm>
    </Create>
);

export default DriverCreate;
