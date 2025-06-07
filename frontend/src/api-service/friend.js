import { api } from "../services/auth";
import { Endpoints } from "./endpoints/endpoint";

export async function serachUsers(value) {
  const res = await api.get(`${Endpoints.friends.search}=${value}`, {
    withCredentials: true,
  });
  return res?.data?.users;
}

export async function sentRequest(id) {
  const res = await api.post(
    `${Endpoints.friends.sent}${id}`,
    {}, // empty body
    {
      withCredentials: true,
    }
  );
  return res;
}

export async function listSentReq() {
  const res = await api.get(Endpoints.friends.getSent, {
    withCredentials: true,
  });
  return res;
}
