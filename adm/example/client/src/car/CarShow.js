/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import { 
    Show, 
    // Tab, 
    // TabbedShowLayout, 
    SimpleShowLayout,
    TextField,
    ImageField
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import CarTitle from './CarTitle';


const CarShow = ({ permissions, ...props }) => (
    <Show title={<CarTitle />} {...props}>
        <SimpleShowLayout>
            
                <ImageField source="get_image_url" title="title" />
                <TextField source="id" />
                <TextField source="name" />
            
      
        </SimpleShowLayout>
       
    </Show>
);

CarShow.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default CarShow;
