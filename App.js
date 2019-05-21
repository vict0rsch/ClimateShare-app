// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import * as React from 'react';
import HeaderButtons from 'react-navigation-header-buttons';
import { Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import SetLocationScreen from './screens/SetLocationScreen';
import PictureUploadedScreen from './screens/PictureUploadedScreen';


// About content
const aboutTitle = "About ClimatePix";

const aboutText = `This project has been initiated from an effort of the Québec Institute for 
Artificial Intelligence (Mila, Quebec) to obtain a dataset of flood pictures 
in order to build Machine Learning models that will be useful for the society. \n 
Public awareness and concern about climate change often do not match the magnitude 
of its threat to humans and our environment. One reason for this disagreement 
is that it is difficult for young people to mentally simulate the effects of 
climate change, which is an inherently complex process. \nOur project aims to 
address this issue by developing an interactive educational tool to present 
accurate and personalized outcomes of climate change as well as their underlying 
processes. \nBy downloading this app, you will be able to send us your pictures 
of floods, fires, earthquakes etc. and your help will be greatly appreciated!`;

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: {
        title: 'FloodReport',
        headerRight: (
          <HeaderButtons IconComponent={MaterialIcons} iconSize={23} >
            <HeaderButtons.Item
              title='About'
              onPress={() => {
                Alert.alert(
                    aboutTitle,
                    aboutText,
                    [
                        {
                            text: 'OK',
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
              }}
            />
          </HeaderButtons>
        ),
      },
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
    SetLocation: SetLocationScreen,
    PictureUploaded: PictureUploadedScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

const App = createAppContainer(stackNavigator);

export default App;
