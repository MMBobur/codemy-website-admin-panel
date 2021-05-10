import service from "../../../appConfig";

const getAll = () => {
  return service.get("/kurslar");
};

const get = (id) => {
  return service.get(`/kurslar/${id}`);
};

const create = (data, token) => {
  return service.post("/kurslar", data, { headers: { token } });
};

const update = (id, data, token) => {
  return service.put(`/kurslar/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return service.delete(`/kurslar/${id}`, { headers: { token } });
};

const removeAll = (token) => {
  return service.delete(`/kurslar`, { headers: { token } });
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
