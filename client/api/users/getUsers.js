import HTTP from "../http-common";

export default async () => {
  return HTTP.get("/users")
}
