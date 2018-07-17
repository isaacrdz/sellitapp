import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import FalseIcon from '../../../assets/images/circle.png'

const navStyle = {
  navBarTextFontSize: 20,
  navBarTextColor: '#ffffff',
  navBarTextFontFamily: 'Roboto',
  navBarTitleTextCentered: true, //Android navBarTextFontFamily
  navBarBackgroundColor: '#0085CA'
}


const navLeftButton = (sources) => {
  return {
    title:'Drawer',
    id:'DrawerButton',
    icon:sources[0],
    disableIconTint:true,
    buttonColor:'white'
  }
}
const LoadTabs = (allow) => {

  Promise.all([
    Icon.getImageSource('bars', 20, 'white'),
    Icon.getImageSource('dollar', 20, 'white'),
    Icon.getImageSource('search', 20, 'white')
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "sellitApp.Home",
          label: "Home",
          title: "Home",
          icon: sources[2],
          navigatorStyle: navStyle,
          navigatorButtons: {
            leftButtons: [navLeftButton(sources)]
          }
        }, {
          screen:  allow ? "sellitApp.AddPost": "sellitApp.NotAllow",
          label: "Sell it",
          title: "Sell it",
          icon: sources[1],
          navigatorStyle: navStyle,
          navigatorButtons: {
            leftButtons: [navLeftButton(sources)]
          }

        }
      ],
      tabsStyles:{
        tabBarButtonColor:'grey',
        tabBarSelectedButtonColor:'#FFC636',
        tabBarTextFontFamily: 'Roboto',
        tabBarBackgroundColor:'white',
        tabBarTranslucent:false
      },
      appStyles:{
        tabBarButtonColor:'grey',
        tabBarSelectedButtonColor:'#FFC636',
        tabBarTextFontFamily: 'Roboto',
        tabBarBackgroundColor:'white',
        navBarButtonColor:'#ffffff',
        keepStyleAcrossPush: true
      },
      drawer:{
        left:{
          screen:"sellitApp.SidedrawerComponent",
          fixedWidht:500
        }
      }
    })
  })

}

export default LoadTabs;
