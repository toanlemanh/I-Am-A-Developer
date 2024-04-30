import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { useContext } from 'react';
import { AuthContext } from '../store/auth';
import { UserContext } from '../store/user-context';

function CustomDrawerContent(props) {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => {
        userContext.refresh();
        authContext.logout();
      }} />
    </DrawerContentScrollView>
  );
}
export default CustomDrawerContent;