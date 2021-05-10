import http from "../../appConfig";

const getAll = () => {
  return http.get("/aforizm");
};

const get = (id) => {
  return http.get(`/aforizm/${id}`);
};

const create = (data, token) => {
  return http.post("/aforizm", data, {
    headers: { token, "content-type": "multipart/form-data" },
  });
};

const update = (id, data, token) => {
  return http.put(`/aforizm/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return http.delete(`/aforizm/${id}`, { headers: { token } });
};

const removeAll = () => {
  return http.delete(`/aforizm`);
};

const findByTitle = (title) => {
  return http.get(`/aforizm?title=${title}`);
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
