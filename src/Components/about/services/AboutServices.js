import http from "../../../appConfig";

const getAll = () => {
  return http.get("/about");
};

const get = (id) => {
  return http.get(`/about/${id}`);
};

const create = (data, token) => {
  return http.post("/about", data, { headers: { token } });
};

const update = (id, data, token) => {
  return http.put(`/about/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return http.delete(`/about/${id}`, { headers: { token } });
};

const removeAll = (token) => {
  return http.delete(`/about`, { headers: { token } });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
