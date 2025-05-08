import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Notification } from '@/types/notification';
import { deleteNotification, markNotificationAsRead } from '@/api/notification';
import NotificationOptions from './NotificationOptions';
import { Entypo } from '@expo/vector-icons';
import NotificationImage from './NotificationImage';


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

  const getIconName = () => {
    switch (notification.type) {
      case 'FlashCardSet':
        return 'clone';
      case 'Quiz':
        return 'question-circle';
      case 'StudentEnrolled':
        return 'user';
      case 'StudentSubmitQuiz':
        return 'check-square';
      default:
        return 'bell';
    }
  };

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
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await markNotificationAsRead(notification.notificationId);
      onRead(notification.notificationId);
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className={`rounded-lg py-2 px-3 mb-3 ${notification.isRead ? 'bg-white' : 'bg-gray-200'} border border-gray-300`}>
          <View className="flex-row items-start gap-3">
            <NotificationImage
              image={require('../../assets/images/userAvatarTest.png')}
              iconName={getIconName()}
            />
            <View className="flex-1">
              <Text className="text-[14px] font-medium text-gray-900" numberOfLines={3}>
                {notification.content}
              </Text>
              <View className="flex-row justify-between mt-1">
                <Text className="text-[11px] text-gray-600">{formatTypeText(notification.type)}</Text>
                <Text className="text-[11px] text-gray-600">{timeAgo}</Text>
              </View>
            </View>
            <TouchableOpacity className=" my-auto" onPress={() => setModalVisible(true)}>
              <Entypo name="dots-three-horizontal" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <NotificationOptions
        notificationContent={notification.content}
        notificationType={notification.type}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
        onMarkAsRead={handleMarkAsRead}
      />
    </>
  );
};

export default NotificationItem;
