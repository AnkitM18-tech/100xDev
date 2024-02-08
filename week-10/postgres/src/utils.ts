import { Client } from "pg";
import { postgresConnectionString } from "./config";

export async function getClient() {
  const client = new Client(postgresConnectionString);
  await client.connect();
  return client;
}
