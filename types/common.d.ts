export type SchemaType = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
export type SchemaLike<T> = boolean | SchemaObjectLike<T>;
export type Schema = boolean | SchemaObject;

export interface SchemaDependencies<T> {
  [propertyName: string]: T | string[];
}

export interface SchemaMap<T> {
  [propertyName: string]: T;
}

export interface SchemaCustomKeywords {
  // use module augmentation to define custom keywords
}

export interface SchemaObjectLike<T> extends SchemaCustomKeywords {
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

  type?: SchemaType | SchemaType[];
  enum?: any[];
  const?: any;

  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;

  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;

  items?: SchemaLike<T> | SchemaLike<T>[];
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

  allOf?: SchemaLike<T>[];
  anyOf?: SchemaLike<T>[];
  oneOf?: SchemaLike<T>[];
  not?: SchemaLike<T>;
}

export interface SchemaObject extends SchemaObjectLike<Schema> { }
