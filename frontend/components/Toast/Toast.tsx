import { AccessibilityInfo } from 'react-native';
import { createNotifications, notify, SlideInLeftSlideOutRight } from 'react-native-notificated';
import { DefaultVariants } from 'react-native-notificated/lib/typescript/defaultConfig/types';

const { NotificationsProvider, useNotifications } = createNotifications({
    isNotch: true,
    duration: 2000,
    notificationPosition: 'bottom',
    notificationWidth: 400,
    animationConfig: SlideInLeftSlideOutRight,
    defaultStylesSettings: {
      darkMode: false,
      successConfig: {
        // titleSize: 18,
        // titleColor: '#155724',
        // descriptionSize: 14,
        // descriptionColor: '#155724',
        // bgColor: '#d4edda',
        // borderType: 'accent',   
        // borderRadius: 10,
        // accentColor: '#28a745',
        // defaultIconType: 'color',
        // multiline: 3,
        // leftIconSource: require('../../assets/images/success1.png'),
      },
      errorConfig: {
        titleSize: 18,
        titleColor: '#721c24',
        descriptionSize: 13,
        descriptionColor: '#721c24',
        bgColor: '#f8d7da',
        borderType: 'accent',
        borderRadius: 10,
        accentColor: '#dc3545',
        defaultIconType: 'color',
        multiline: 3,
        leftIconSource: require('../../assets/images/error.png'),
      },
      infoConfig: {
        titleSize: 18,
        titleColor: '#0c5460',
        descriptionSize: 14,
        descriptionColor: '#0c5460',
        bgColor: '#d1ecf1',
        borderType: 'accent',
        borderRadius: 10,
        accentColor: '#17a2b8',
        defaultIconType: 'color',
        multiline: 3,
        leftIconSource: require('../../assets/images/info.png'),
      }
    },
  })
  
  const showNotification = (type: keyof DefaultVariants, title: string, description: string) => {
    notify(type, {
      params: {
        title: title,
        description: description,
      },
    });
    setTimeout(() => {
      AccessibilityInfo.announceForAccessibility(`${title}! ${description}`);
    }, 1500);
  };
    

export { NotificationsProvider, useNotifications, showNotification };
