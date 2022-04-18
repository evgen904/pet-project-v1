import HTTP from "../http-common";

export default async (payload) => {
  return HTTP.post("/registration", payload)
}
