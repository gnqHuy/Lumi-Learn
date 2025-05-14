import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ScrollView as ScrollViewType,
} from 'react-native';
import NotificationItem from '@/components/Notification/NotificationItem';
import { Notification } from '@/types/notification';
import { GetNotification, markAllNotificationsAsRead } from '@/api/notification';
import { showNotification } from '@/components/Toast/Toast';
import useNotificationStore from '@/zustand/notificationStore';

const isToday = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAllPrevious, setShowAllPrevious] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollViewType>(null);
  const { setUnreadCount } = useNotificationStore();

  const fetchNotifications = async () => {
    try {
      const response = await GetNotification();
      setNotifications(response.data);
      const count = response.data.filter((n: { isRead: any; }) => !n.isRead).length;
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const handleDelete = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.notificationId !== notificationId)
    );
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => {
        const updated = prev.map((n) => ({ ...n, isRead: true }));
        setUnreadCount(0);
        return updated;
      });
      showNotification('success', 'Success!', 'All notifications have been marked as read.');
    } catch (error) {
      console.error('Error marking all as read:', error);
      showNotification('error', 'Error!', 'Something is wrong');
    }
  };

  const handleMarkSingleAsRead = (notificationId: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.notificationId === notificationId ? { ...n, isRead: true } : n
      );
      const count = updated.filter((n) => !n.isRead).length;
      setUnreadCount(count); 
      return updated;
    });
  };

  const todayNotifications = notifications.filter((n) => isToday(n.createdAt));
  const previousNotifications = notifications.filter((n) => !isToday(n.createdAt));
  const visiblePreviousNotifications = showAllPrevious
    ? previousNotifications
    : previousNotifications.slice(0, 10);

  const togglePrevious = () => {
    const willReduce = showAllPrevious;
    setShowAllPrevious(!willReduce);
    if (willReduce) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 50);
    }
  };

  return (
    <View className="flex-1 bg-white pt-[68px]">
      <Text className="text-3xl text-cyan-800 font-extrabold ml-6 mb-4" accessibilityRole="header">
        Notifications
      </Text>
      {notifications.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl text-gray-600 font-semibold">You have no notifications</Text>
        </View>
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {todayNotifications.length > 0 && (
          <View className="w-[100%]">
            <View className="flex-row justify-between items-center mb-2 mx-5">
              <Text className="text-lg text-cyan-800 font-semibold p-1" accessibilityRole="header">
                Today
              </Text>
              <TouchableOpacity
                className="p-2"
                onPress={handleMarkAllAsRead}
                accessible={true}
                accessibilityRole="button"
                accessibilityHint="Double tap to mark all notifications as read"
              >
                <Text className="text-cyan-800 font-medium text-sm">Mark all as read</Text>
              </TouchableOpacity>
            </View>

            {todayNotifications.map((notification) => (
              <NotificationItem
                key={notification.notificationId}
                notification={notification}
                onDelete={handleDelete}
                onRead={handleMarkSingleAsRead}
              />
            ))}
          </View>
        )}

        {previousNotifications.length > 0 && (
          <View className="w-[100%] mt-3">
            <View className="flex-row justify-between items-center mb-2 mx-5">
              <Text className="text-lg text-cyan-800 font-semibold p-1" accessibilityRole="header">
                Earlier
              </Text>
              {todayNotifications.length === 0 && (
                <TouchableOpacity
                  className="p-2"
                  onPress={handleMarkAllAsRead}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityHint="Double tap to mark all notifications as read"
                >
                  <Text className="text-cyan-800 font-medium text-sm">Mark all as read</Text>
                </TouchableOpacity>
              )}
            </View>

            {visiblePreviousNotifications.map((notification) => (
              <NotificationItem
                key={notification.notificationId}
                notification={notification}
                onDelete={handleDelete}
                onRead={handleMarkSingleAsRead}
              />
            ))}

            {previousNotifications.length > 10 && (
              <TouchableOpacity
                className="mt-6 self-center bg-cyan-900 px-4 py-3 rounded-full"
                onPress={togglePrevious}
              >
                <Text className="text-white font-semibold">
                  {showAllPrevious ? 'Reduce' : 'See previous notification'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationPage;
