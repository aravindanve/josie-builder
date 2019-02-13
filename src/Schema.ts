export type NonEmptyArray<T> = [T, ...T[]];
export type SchemaType = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
export type SchemaLike<T> = boolean | T | SchemaObjectLike<T>;
export type SchemaRaw = boolean | SchemaObjectRaw;

export interface SchemaDependencies<T> {
  [propertyName: string]: T | string[];
}

export interface SchemaMap<T> {
  [propertyName: string]: T;
}

export interface SchemaObjectLike<T> extends JosieSchemaObject {
  $schema?: string;
  $id?: string;
  $ref?: string;
  $comment?: string;

  title?: string;
  description?: string;
  default?: any;
  readOnly?: boolean;
  examples?: any[];
  definitions?: SchemaMap<SchemaLike<T>>;

  type?: SchemaType | NonEmptyArray<SchemaType>;
  enum?: NonEmptyArray<any>;
  const?: any;

  multipeOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;

  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;

  items?: SchemaLike<T> | NonEmptyArray<SchemaLike<T>>;
  additionalItems?: SchemaLike<T>;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  contains?: SchemaLike<T>;

  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  properties?: SchemaMap<SchemaLike<T>>;
  patternProperties?: SchemaMap<SchemaLike<T>>;
  additionalProperties?: SchemaLike<T>;
  propertyNames?: SchemaLike<T>;
  dependencies?: SchemaDependencies<SchemaLike<T>>;

  contentMediaType?: string;
  contentEncoding?: string;

  if?: SchemaLike<T>;
  then?: SchemaLike<T>;
  else?: SchemaLike<T>;

  allOf?: NonEmptyArray<SchemaLike<T>>;
  anyOf?: NonEmptyArray<SchemaLike<T>>;
  oneOf?: NonEmptyArray<SchemaLike<T>>;
  not?: SchemaLike<T>;
}

export interface SchemaObjectRaw extends
  SchemaObjectLike<SchemaRaw>,
  JosieSchemaObject { }
