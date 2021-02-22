/* eslint react/jsx-key: off */
import PeopleIcon from '@material-ui/icons/People';
import memoize from 'lodash/memoize';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import React, {Children, cloneElement} from 'react';
import {
    BulkDeleteWithConfirmButton,
    Datagrid,
    Filter,
    List,
    SearchInput,
    SimpleList,
    TextField,
    TextInput,
    BooleanField,
    ImageField,
    EditButton,
    ShowButton,
} from 'react-admin';

import UserEditEmbedded from './UserEditEmbedded';
export const UserIcon = PeopleIcon;

const RiderFilter = ({ permissions, ...props }) => (
    <>
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <TextInput source="name" />
        {permissions !== 'admin' ? <TextInput source="role" /> : null}
    </Filter>
    
    </>
);

const RiderBulkActionButtons = props => (
    <>
    <BulkDeleteWithConfirmButton {...props} />
    <EditButton  />
    </>
);

const rowClick = memoize(permissions => (id, basePath, record) => {
    return permissions === 'admin'
        ? Promise.resolve('edit')
        : Promise.resolve('show');
});

const usePostListActionToolbarStyles = makeStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        marginTop: -1,
        marginBottom: -1,
    },
});

const PostListActionToolbar = ({ children, ...props }) => {
    const classes = usePostListActionToolbarStyles();
    return (
        <div className={classes.toolbar}>
            {Children.map(children, button => cloneElement(button, props))}
        </div>
    );
};

const RiderList = ({ permissions, ...props }) => (
    <List
        {...props}
        filters={<RiderFilter permissions={permissions} />}
        filterDefaultValues={{ role: 'user' }}
        sort={{ field: 'name', order: 'ASC' }}
        bulkActionButtons={<RiderBulkActionButtons />}
    >
        {useMediaQuery(theme => theme.breakpoints.down('sm')) ? (
            <SimpleList
                primaryText={record => record.name}
                secondaryText={record =>
                    permissions === 'admin' ? record.role : null
                }
            />
        ) : (
            <Datagrid
                rowClick={rowClick(permissions)}
                expand={<UserEditEmbedded />}
                optimized
            >
                <TextField source="id" />
                <TextField source="name" />
                <BooleanField source="active" />
                <ImageField source="small_image_url" title="title" />
                {permissions === 'admin' && <TextField source="role" />}
                <PostListActionToolbar>
                    <EditButton />
                    <ShowButton />
                </PostListActionToolbar>
            </Datagrid>
        )}
    </List>
);

export default RiderList;
