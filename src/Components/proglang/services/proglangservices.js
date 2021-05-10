import service from "../../../appConfig";

const getAll = () => {
  return service.get("/proglang");
};

const get = (id) => {
  return service.get(`/proglang/${id}`);
};

const create = (data, token) => {
  return service.post("/proglang", data, { headers: { token } });
};

const update = (id, data, token) => {
  return service.put(`/proglang/${id}`, data, { headers: { token } });
};

const remove = (id, token) => {
  return service.delete(`/proglang/${id}`, { headers: { token } });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
};
