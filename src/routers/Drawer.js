import { DrawerNavigator } from 'react-navigation';
import TabStack from './RootStack';
import { PRIMARY, SECONDARY, ON_PRIMARY, BACKGROUND } from '../themes/PurpleTeal/PurpleTeal';

const Drawer = DrawerNavigator(
	{
		Home: {
			screen: TabStack
		}
	},
	{
		initialRouteName: 'Home',
		contentOptions: {
			activeBackgroundColor: PRIMARY,
			inactiveBackgroundColor: SECONDARY,
			activeTintColor: ON_PRIMARY,
			itemsContainerStyle: {
				backgroundColor: BACKGROUND,
				flex: 1
			}
		}
	}
);

export default Drawer;
