import axios from 'axios';

const API_URL = 'http://localhost:5000/api/activities';

class ActivityService {
  async createActivity(activityData) {
    const response = await axios.post(`${API_URL}/create`, activityData);
    return response.data;
  }

  async getActivities() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async joinActivity(activityId) {
    const response = await axios.post(`${API_URL}/${activityId}/join`);
    return response.data;
  }
}

export default new ActivityService();