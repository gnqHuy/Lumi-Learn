import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, findNodeHandle, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import NotificationImage from './NotificationImage';

interface Props {
  visible: boolean;
  notificationContent: string;
  notificationType: string;
  notificationThumbnail: string,
  onClose: () => void;
  onDelete: () => void;
  onMarkAsRead: () => void;
}

const NotificationOptions = ({ visible, notificationContent, notificationType, notificationThumbnail, onClose, onDelete, onMarkAsRead }: Props) => {
  const markAsReadRef = useRef(null);

  useEffect(() => {
    const node = findNodeHandle(markAsReadRef.current);
    if (node) {
        setTimeout(() => {
            AccessibilityInfo.setAccessibilityFocus(node);
        }, 300);
    }
  }, []);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50"
        onPress={onClose}
        accessible={true}
        accessibilityLabel='Close Notification Option area. Double tab to turn off notification options modal'
      />

      <View className="absolute bottom-0 w-full bg-white rounded-t-2xl px-4 pt-4 pb-6">
        <View className='mx-auto mb-3 mt-2'>
            <NotificationImage
              image={notificationThumbnail}
              type={notificationType}
            />
        </View>
        <Text className="text-[16px] text-center font-medium mb-8"
          accessibilityLabel={`Notification detail: ${notificationContent}`} 
        >
          {notificationContent}</Text>

        <TouchableOpacity className="flex-row py-5 border-b border-gray-200"
          ref={markAsReadRef}
          onPress={onMarkAsRead}
          accessible={true}
          accessibilityLabel="Mark as read"
          accessibilityRole='button'
          accessibilityHint='Double tab to mark this notification as read'
        >
            <Ionicons name="mail-open-outline" size={21} color="#155e75" />
          <Text className="ml-2 text-base text-black">Mark as read</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row py-5 border-b border-gray-200 mb-10"
          onPress={onDelete}
          accessible={true}
          accessibilityLabel="Delete"
          accessibilityRole='button'
          accessibilityHint='Double tab to Delete this notification'
        >
            <FontAwesome className='ml-1' name="trash-o" size={21} color="#155e75" />
          <Text className="ml-2 text-base text-black">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NotificationOptions;
