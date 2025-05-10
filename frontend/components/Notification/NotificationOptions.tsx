import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
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
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50" onPress={onClose} />

      <View className="absolute bottom-0 w-full bg-white rounded-t-2xl px-4 pt-4 pb-6">
        <View className='mx-auto mb-3 mt-2'>
            <NotificationImage
              image={notificationThumbnail}
              type={notificationType}
            />
        </View>
        <Text className="text-[16px] text-center font-medium mb-8">{notificationContent}</Text>

        <TouchableOpacity className="flex-row py-5 border-b border-gray-200" onPress={onMarkAsRead}>
            <Ionicons name="mail-open-outline" size={21} color="#155e75" />
          <Text className="ml-2 text-base text-black">Mark as read</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row py-5 border-b border-gray-200 mb-10" onPress={onDelete}>
            <FontAwesome className='ml-1' name="trash-o" size={21} color="#155e75" />
          <Text className="ml-2 text-base text-black">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NotificationOptions;
