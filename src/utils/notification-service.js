import Push from "push.js";

export default {
  raiseNotification(title, icon, body) {
    Push.create(title, {
      body: body,
      icon: icon,
      timeout: 4000,
      onClick: function() {
        window.focus();
        this.close();
      }
    });
  }
};
