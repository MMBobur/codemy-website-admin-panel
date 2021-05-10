import http from "../../../appConfig";

const getAll = () => {
  return http.get("/videos");
};

const get = (id) => {
  return http.get(`/videos/${id}`);
};

const create = (data, token) => {
  return http.post("/videos", data, { headers: { token } });
};

const update = (id, data, token) => {
  return http.put(`/videos/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return http.delete(`/videos/${id}`, { headers: { token } });
};

const removeAll = () => {
  return http.delete(`/videos`);
};

const getToken = () => {
  return localStorage.getItem("token");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getToken,
};
