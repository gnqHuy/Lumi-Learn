import React, { useState } from 'react';
import { View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Notification } from '@/types/notification';
import { deleteNotification, markNotificationAsRead } from '@/api/notification';
import NotificationOptions from './NotificationOptions';
import { Entypo } from '@expo/vector-icons';
import NotificationImage from './NotificationImage';
import { showNotification } from '../Toast/Toast';


interface Props {
  notification: Notification;
  onDelete: (notificationId: string) => void;
  onRead: (notificationId: string) => void;
} 

const NotificationItem = ({ notification, onDelete, onRead }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const createdAt = new Date(notification.createdAt);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    const diffWeek = Math.floor(diffDay / 7);
  
    if (diffDay === 0) {
      if (diffHr > 0) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
      if (diffMin > 0) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
      return `Just now`;
    }
  
    if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
    if (diffWeek === 1) return `1 week ago`;
    return `${diffWeek} weeks ago`;
  };  
  
  const timeAgo = getTimeAgo(createdAt);

  const formatTypeText = (type: string) => {
    switch (type) {
      case 'FlashCardSet':
        return 'Flashcard Set Created';
      case 'Quiz':
        return 'Quiz';
      case 'StudentEnrolled':
        return 'Student Enrolled';
      case 'StudentSubmitQuiz':
        return 'Quiz Submitted';
      default:
        return 'Notification';
    }
  };  

  const handleDelete = async () => {
    try {
      await deleteNotification(notification.notificationId);
      onDelete(notification.notificationId);
      showNotification('success', 'Success!', 'Notification was deleted');
    } catch (error) {
      showNotification('error', 'Error!', 'Something is wrong');
    } finally {
      setModalVisible(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await markNotificationAsRead(notification.notificationId);
      onRead(notification.notificationId);
      showNotification('success', 'Success!', 'Notification is marked as read');
    } catch (error) {
      showNotification('error', 'Error!', 'Something is wrong');
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}
        accessible={true}
        accessibilityLabel={`${notification.content}. ${timeAgo}. ${!notification.isRead ? 'unread' : ''}`}
        accessibilityRole='button'
        accessibilityHint='Double tab to see more notifications options'
      >
        <View className={`py-2 px-3 pb-3 ${notification.isRead ? 'bg-white' : 'bg-blue-300/20'} border-non`}>
          <View className="flex-row items-start gap-3">
            <NotificationImage
              image={notification.thumbnail}
              type={notification.type}
            />
            <View className="flex-1">
              <Text className="text-[14px] leading-6 font-medium text-gray-900" numberOfLines={3}>
                {notification.content}
              </Text>
              <View className="flex-row justify-between mt-1">
                <Text className="text-[11px] text-gray-600">{formatTypeText(notification.type)}</Text>
                <Text className="text-[11px] text-gray-600">{timeAgo}</Text>
              </View>
            </View>
            <TouchableOpacity className=" my-auto" onPress={() => setModalVisible(true)}>
              <Entypo name="dots-three-horizontal" size={20} color="#155e75" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {modalVisible
        ?
        <NotificationOptions
          notificationContent={notification.content}
          notificationType={notification.type}
          notificationThumbnail={notification.thumbnail}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onDelete={handleDelete}
          onMarkAsRead={handleMarkAsRead}
        />
        :
        <></>
      }
    </>
  );
};

export default NotificationItem;
