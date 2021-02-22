/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import { 
    Show, 
    // Tab, 
    // TabbedShowLayout, 
    SimpleShowLayout,
    TextField,
    // EditButton,
    ImageField
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import RiderTitle from './RiderTitle';
// import Aside from './Aside';

const RiderShow = ({ permissions, ...props }) => (
    <Show title={<RiderTitle />} {...props}>
        <SimpleShowLayout>
            
                <ImageField source="get_image_url" title="title" />
                <TextField source="id" />
                <TextField source="name" />
            
      
        </SimpleShowLayout>
       
    </Show>
);

RiderShow.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default RiderShow;
