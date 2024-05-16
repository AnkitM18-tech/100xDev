/*
import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
  {
    name: "harkirat",
    age: 45,
  },
  {
    name: "raman",
    age: 45,
  },
];

// call -> req and callback -> res.json() similar
// callback(null,person) => if error occurs then an error message is returned(here we returned null as there is no error), else person is returned on success.

//@ts-ignore
function addPerson(call, callback) {
  //   console.log(call);
  let person = {
    name: call.request.name,
    age: call.request.age,
  };
  PERSONS.push(person);
  callback(null, person);
}

//@ts-ignore
function getPersonByName(call, callback) {
  const name = call.request.name;
  const person = PERSONS.find((p) => p.name === name);
  callback(null, person);
}

// const app = express();
const server = new grpc.Server();

server.addService(
  (personProto.AddressBookService as ServiceClientConstructor).service,
  { addPerson: addPerson, getPersonByName: getPersonByName }
);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);

// Error first callbacks, the first argument is the error message if any(if null means no error), then the response is 2nd argument.
*/

import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./generated/a";
import { AddressBookServiceHandlers } from "./generated/AddressBookService";
import { Status } from "@grpc/grpc-js/build/src/constants";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "./a.proto")
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const PERSONS = [
  {
    name: "harkirat",
    age: 45,
  },
  {
    name: "raman",
    age: 45,
  },
];

const handler: AddressBookServiceHandlers = {
  AddPerson: (call, callback) => {
    let person = {
      name: call.request.name,
      age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person);
  },
  GetPersonByName: (call, callback) => {
    let person = PERSONS.find((x) => x.name === call.request.name);
    if (person) {
      callback(null, person);
    } else {
      callback(
        {
          code: Status.NOT_FOUND,
          details: "not found",
        },
        null
      );
    }
  },
};

const server = new grpc.Server();

server.addService(personProto.AddressBookService.service, handler);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
