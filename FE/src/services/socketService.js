import io from 'socket.io-client';

class SocketService {
  socket;

  connect() {
    this.socket = io('http://localhost:5000');
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.emit('chat message', message);
    }
  }

  onMessage(callback) {
    if (this.socket) {
      this.socket.on('chat message', callback);
    }
  }

  login(username) {
    if (this.socket) {
      this.socket.emit('user_login', { username });
    }
  }

  onUserList(callback) {
    if (this.socket) {
      this.socket.on('user_list', callback);
    }
  }
}

export default new SocketService();