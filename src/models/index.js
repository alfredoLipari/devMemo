// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Card, User } = initSchema(schema);

export {
  Card,
  User
};