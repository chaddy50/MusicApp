import { DrawerNavigator } from 'react-navigation';
import TabStack from './RootStack';

const Drawer = DrawerNavigator(
	{
		Home: {
			screen: TabStack
		}
	},
	{
		initialRouteName: 'Home',
		contentOptions: {
			activeBackgroundColor: '#404040',
			inactiveBackgroundColor: '#404040',
			activeTintColor: '#FFF',
			itemsContainerStyle: {
				backgroundColor: '#FFF',
				flex: 1
			},
			indicatorStyle: {
				backgroundColor: '#9900CC'
			}
		}
	}
);

export default Drawer;
