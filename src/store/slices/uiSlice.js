import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  theme: "midnight", // midnight, light
  notifications: [],
  modals: {
    isCreatePostExpanded: false,
    isImagePreviewOpen: false,
    currentImageUrl: null,
  },
  toast: {
    isVisible: false,
    message: "",
    type: "info", // info, success, error, warning
  },
  sidebar: {
    isOpen: false,
    activeTab: "home", // home, profile, settings
  },
};

// UI slice
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "midnight" ? "light" : "midnight";
    },

    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (notif) => notif.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    // Modal actions
    setCreatePostExpanded: (state, action) => {
      state.modals.isCreatePostExpanded = action.payload;
    },
    openImagePreview: (state, action) => {
      state.modals.isImagePreviewOpen = true;
      state.modals.currentImageUrl = action.payload;
    },
    closeImagePreview: (state) => {
      state.modals.isImagePreviewOpen = false;
      state.modals.currentImageUrl = null;
    },

    // Toast actions
    showToast: (state, action) => {
      state.toast = {
        isVisible: true,
        message: action.payload.message,
        type: action.payload.type || "info",
      };
    },
    hideToast: (state) => {
      state.toast.isVisible = false;
    },

    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSidebarTab: (state, action) => {
      state.sidebar.activeTab = action.payload;
    },
    closeSidebar: (state) => {
      state.sidebar.isOpen = false;
    },
  },
});

// Export actions
export const {
  setTheme,
  toggleTheme,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  clearAllNotifications,
  setCreatePostExpanded,
  openImagePreview,
  closeImagePreview,
  showToast,
  hideToast,
  toggleSidebar,
  setSidebarTab,
  closeSidebar,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectNotifications = (state) => state.ui.notifications;
export const selectUnreadNotificationsCount = (state) =>
  state.ui.notifications.filter((notif) => !notif.read).length;
export const selectModals = (state) => state.ui.modals;
export const selectToast = (state) => state.ui.toast;
export const selectSidebar = (state) => state.ui.sidebar;

export default uiSlice.reducer;
