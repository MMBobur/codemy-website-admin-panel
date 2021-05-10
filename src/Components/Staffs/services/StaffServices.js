import http from "../../../appConfig";

const getAll = () => {
  return http.get("/staff");
};

const get = (id) => {
  return http.get(`/staff/${id}`);
};

const create = (data, token) => {
  return http.post("/staff", data, { headers: { token } });
};

const update = (id, data, token) => {
  return http.put(`/staff/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return http.delete(`/staff/${id}`, { headers: { token } });
};

const removeAll = (token) => {
  return http.delete(`/staff`, { headers: { token } });
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
