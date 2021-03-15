import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "79396974-bd51-4ce7-ab7d-49eea09edb88",
  },
});

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put("profile/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term = "") {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
      .then((response) => {
        return response.data;
      });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = true, captcha = null) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};

const secondInstance = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
});

export const weatherAPI = {
  getWeather() {
    return secondInstance.get(
      `weather?q=Kazan&appid=861059712419c75e938bdce98d1a7063`
    );
  },
};
