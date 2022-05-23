import * as React from 'react';
import PropTypes from 'prop-types';
import UsersData from './UsersData';
import PostsData from './PostsData';
import Group from "@mui/icons-material/Group";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import {
  AppBar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
  

  function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      
    >
      {value === index && (
          <Typography component={"span"}>{children}</Typography>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		"aria-controls": `scrollable-force-tabpanel-${index}`,
	};
}

function App() {
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = React.useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setUsers(users))
    .catch((error) => console.log("Error >", error));
  },[]);
  
  return (
      
      <>
      {console.log(users)}
      <div className ="App">
       <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Users" id="simple-tab-1" icon={<Group />} {...a11yProps(0)} aria-controls="simple-tabpanel-0"/>
          <Tab label="Posts" id="simple-tab-2"  icon={<PersonPinIcon />}
							{...a11yProps(1)} aria-controls="simple-tabpanel-1"/>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
      <UsersData users={users}/>
        </TabPanel>
      <TabPanel value={value} index={1}>
         <PostsData users={users}/>
      </TabPanel>

      </div>
      </>
      
  );
}


export default App;

 
