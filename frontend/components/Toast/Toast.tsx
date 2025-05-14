import { AccessibilityInfo } from 'react-native';
import { createNotifications, notify, SlideInLeftSlideOutRight } from 'react-native-notificated';
import { DefaultVariants } from 'react-native-notificated/lib/typescript/defaultConfig/types';

const { NotificationsProvider, useNotifications } = createNotifications({
    isNotch: true,
    duration: 3000,
    notificationPosition: 'bottom',
    notificationWidth: 400,
    animationConfig: SlideInLeftSlideOutRight,
    defaultStylesSettings: {
      darkMode: false
    },
  })
  
  const showNotification = (type: keyof DefaultVariants, title: string, description: string) => {
    notify(type, {
      params: {
        title: title,
        description: description,
      },
    });
    // setTimeout(() => {
    //   AccessibilityInfo.announceForAccessibility(`${title}! ${description}`);
    // }, 300);
  };
    

export { NotificationsProvider, useNotifications, showNotification };
