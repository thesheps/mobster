const avatarService = {
  getAvatar: () => {
    return `img/avatars/${Math.floor(Math.random() * 9) + 1}.jpg`;
  }
};

export default avatarService;
