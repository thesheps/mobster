const notificationService = {
  requestPermission: () => {},

  show: (title, body) => {
    return `img/avatars/${Math.floor(Math.random() * 9) + 1}.jpg`;
  }
};

export default notificationService;
