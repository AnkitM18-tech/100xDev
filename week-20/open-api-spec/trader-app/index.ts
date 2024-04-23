import { DefaultService } from "./generated";

async function main() {
  const response = await DefaultService.getUsers("12343");
  console.log(response);
}

main();

// we didn't have to write any logic we just created the earlier generated library from the openapispec file spec.json.
