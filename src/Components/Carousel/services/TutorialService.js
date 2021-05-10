import http from "../../../appConfig";

const getAll = () => {
  return http.get("/carousel");
};

const get = (id) => {
  return http.get(`/carousel/${id}`);
};

const create = (data, token) => {
  return http.post("/carousel", data, {
    headers: { token, "content-type": "multipart/form-data" },
  });
};

const update = (id, data, token) => {
  return http.put(`/carousel/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return http.delete(`/carousel/${id}`, { headers: { token } });
};

const removeAll = () => {
  return http.delete(`/carousel`);
};

const findByTitle = (title) => {
  return http.get(`/carousel?title=${title}`);
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
  findByTitle,
  getToken,
};
