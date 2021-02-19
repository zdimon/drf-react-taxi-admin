import logo from './logo.svg';
import './App.css';

import { Admin, Resource, ListGuesser } from 'react-admin';

import driver from './driver';

import drfProvider, { tokenAuthProvider, fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
const dataProvider = drfProvider("http://localhost:8000/v1", fetchJsonWithAuthToken);
const authProvider = tokenAuthProvider()
const App = () => (<Admin 
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="driver" {...driver} />,
  </Admin>
);

export default App;
