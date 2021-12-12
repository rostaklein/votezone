/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context as Context } from "./../pages/api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Chronicle: { // root type
    id?: string | null; // String
    name?: string | null; // String
    shortcut?: string | null; // String
  }
  Mutation: {};
  Query: {};
  Server: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
  }
  User: { // root type
    email?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Chronicle: { // field return type
    id: string | null; // String
    name: string | null; // String
    shortcut: string | null; // String
  }
  Mutation: { // field return type
    createServer: NexusGenRootTypes['Server'] | null; // Server
    deleteServer: NexusGenRootTypes['Server'] | null; // Server
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    register: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    approvedServers: Array<NexusGenRootTypes['Server'] | null> | null; // [Server]
    chronicles: Array<NexusGenRootTypes['Chronicle'] | null> | null; // [Chronicle]
    me: NexusGenRootTypes['User'] | null; // User
    server: NexusGenRootTypes['Server'] | null; // Server
    unapprovedServers: Array<NexusGenRootTypes['Server'] | null> | null; // [Server]
  }
  Server: { // field return type
    addedBy: NexusGenRootTypes['User'] | null; // User
    chronicle: NexusGenRootTypes['Chronicle'] | null; // Chronicle
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    id: string | null; // String
    name: string | null; // String
  }
  User: { // field return type
    addedServers: Array<NexusGenRootTypes['Server'] | null> | null; // [Server]
    email: string | null; // String
    id: string | null; // String
    name: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Chronicle: { // field return type name
    id: 'String'
    name: 'String'
    shortcut: 'String'
  }
  Mutation: { // field return type name
    createServer: 'Server'
    deleteServer: 'Server'
    login: 'AuthPayload'
    register: 'User'
  }
  Query: { // field return type name
    approvedServers: 'Server'
    chronicles: 'Chronicle'
    me: 'User'
    server: 'Server'
    unapprovedServers: 'Server'
  }
  Server: { // field return type name
    addedBy: 'User'
    chronicle: 'Chronicle'
    createdAt: 'DateTime'
    description: 'String'
    id: 'String'
    name: 'String'
  }
  User: { // field return type name
    addedServers: 'Server'
    email: 'String'
    id: 'String'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createServer: { // args
      chronicle: string; // ID!
      description?: string | null; // String
      name: string; // String!
    }
    deleteServer: { // args
      id: string; // ID!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      email: string; // String!
      name?: string | null; // String
      password: string; // String!
    }
  }
  Query: {
    server: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}