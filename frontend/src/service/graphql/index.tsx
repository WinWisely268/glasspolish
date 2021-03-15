import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "accounts" */
export type Accounts = {
  __typename?: 'accounts';
  email: Scalars['String'];
  last_login?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  profile?: Maybe<Profiles>;
  /** fetch data from the table: "profile_pictures" */
  profile_pictures: Array<Profile_Pictures>;
  /** fetch aggregated fields from the table: "profile_pictures" */
  profile_pictures_aggregate: Profile_Pictures_Aggregate;
  role: Scalars['String'];
  user_id: Scalars['uuid'];
};


/** columns and relationships of "accounts" */
export type AccountsProfile_PicturesArgs = {
  distinct_on?: Maybe<Array<Profile_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Pictures_Order_By>>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsProfile_Pictures_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Pictures_Order_By>>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
  __typename?: 'accounts_aggregate';
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
  __typename?: 'accounts_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
};


/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Accounts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: Maybe<Array<Accounts_Bool_Exp>>;
  _not?: Maybe<Accounts_Bool_Exp>;
  _or?: Maybe<Array<Accounts_Bool_Exp>>;
  email?: Maybe<String_Comparison_Exp>;
  last_login?: Maybe<Timestamptz_Comparison_Exp>;
  profile?: Maybe<Profiles_Bool_Exp>;
  profile_pictures?: Maybe<Profile_Pictures_Bool_Exp>;
  role?: Maybe<String_Comparison_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "accounts" */
export enum Accounts_Constraint {
  /** unique or primary key constraint */
  AccountsEmailKey = 'accounts_email_key',
  /** unique or primary key constraint */
  AccountsPkey = 'accounts_pkey'
}

/** input type for inserting data into table "accounts" */
export type Accounts_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  last_login?: Maybe<Scalars['timestamptz']>;
  profile?: Maybe<Profiles_Obj_Rel_Insert_Input>;
  profile_pictures?: Maybe<Profile_Pictures_Arr_Rel_Insert_Input>;
  role?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: 'accounts_max_fields';
  email?: Maybe<Scalars['String']>;
  last_login?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: 'accounts_min_fields';
  email?: Maybe<Scalars['String']>;
  last_login?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "accounts" */
export type Accounts_Mutation_Response = {
  __typename?: 'accounts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Accounts>;
};

/** on conflict condition type for table "accounts" */
export type Accounts_On_Conflict = {
  constraint: Accounts_Constraint;
  update_columns: Array<Accounts_Update_Column>;
  where?: Maybe<Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "accounts". */
export type Accounts_Order_By = {
  email?: Maybe<Order_By>;
  last_login?: Maybe<Order_By>;
  profile?: Maybe<Profiles_Order_By>;
  profile_pictures_aggregate?: Maybe<Profile_Pictures_Aggregate_Order_By>;
  role?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: accounts */
export type Accounts_Pk_Columns_Input = {
  user_id: Scalars['uuid'];
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  LastLogin = 'last_login',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "accounts" */
export type Accounts_Set_Input = {
  email?: Maybe<Scalars['String']>;
  last_login?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "accounts" */
export enum Accounts_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  LastLogin = 'last_login',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'user_id'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "accounts" */
  delete_accounts?: Maybe<Accounts_Mutation_Response>;
  /** delete single row from the table: "accounts" */
  delete_accounts_by_pk?: Maybe<Accounts>;
  /** delete data from the table: "product_pictures" */
  delete_product_pictures?: Maybe<Product_Pictures_Mutation_Response>;
  /** delete single row from the table: "product_pictures" */
  delete_product_pictures_by_pk?: Maybe<Product_Pictures>;
  /** delete data from the table: "product_tags" */
  delete_product_tags?: Maybe<Product_Tags_Mutation_Response>;
  /** delete single row from the table: "product_tags" */
  delete_product_tags_by_pk?: Maybe<Product_Tags>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "profile_pictures" */
  delete_profile_pictures?: Maybe<Profile_Pictures_Mutation_Response>;
  /** delete single row from the table: "profile_pictures" */
  delete_profile_pictures_by_pk?: Maybe<Profile_Pictures>;
  /** delete data from the table: "profiles" */
  delete_profiles?: Maybe<Profiles_Mutation_Response>;
  /** delete single row from the table: "profiles" */
  delete_profiles_by_pk?: Maybe<Profiles>;
  /** delete data from the table: "warehouses" */
  delete_warehouses?: Maybe<Warehouses_Mutation_Response>;
  /** delete single row from the table: "warehouses" */
  delete_warehouses_by_pk?: Maybe<Warehouses>;
  /** insert data into the table: "accounts" */
  insert_accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert a single row into the table: "accounts" */
  insert_accounts_one?: Maybe<Accounts>;
  /** insert data into the table: "product_pictures" */
  insert_product_pictures?: Maybe<Product_Pictures_Mutation_Response>;
  /** insert a single row into the table: "product_pictures" */
  insert_product_pictures_one?: Maybe<Product_Pictures>;
  /** insert data into the table: "product_tags" */
  insert_product_tags?: Maybe<Product_Tags_Mutation_Response>;
  /** insert a single row into the table: "product_tags" */
  insert_product_tags_one?: Maybe<Product_Tags>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "profile_pictures" */
  insert_profile_pictures?: Maybe<Profile_Pictures_Mutation_Response>;
  /** insert a single row into the table: "profile_pictures" */
  insert_profile_pictures_one?: Maybe<Profile_Pictures>;
  /** insert data into the table: "profiles" */
  insert_profiles?: Maybe<Profiles_Mutation_Response>;
  /** insert a single row into the table: "profiles" */
  insert_profiles_one?: Maybe<Profiles>;
  /** insert data into the table: "warehouses" */
  insert_warehouses?: Maybe<Warehouses_Mutation_Response>;
  /** insert a single row into the table: "warehouses" */
  insert_warehouses_one?: Maybe<Warehouses>;
  /** update data of the table: "accounts" */
  update_accounts?: Maybe<Accounts_Mutation_Response>;
  /** update single row of the table: "accounts" */
  update_accounts_by_pk?: Maybe<Accounts>;
  /** update data of the table: "product_pictures" */
  update_product_pictures?: Maybe<Product_Pictures_Mutation_Response>;
  /** update single row of the table: "product_pictures" */
  update_product_pictures_by_pk?: Maybe<Product_Pictures>;
  /** update data of the table: "product_tags" */
  update_product_tags?: Maybe<Product_Tags_Mutation_Response>;
  /** update single row of the table: "product_tags" */
  update_product_tags_by_pk?: Maybe<Product_Tags>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update data of the table: "profile_pictures" */
  update_profile_pictures?: Maybe<Profile_Pictures_Mutation_Response>;
  /** update single row of the table: "profile_pictures" */
  update_profile_pictures_by_pk?: Maybe<Profile_Pictures>;
  /** update data of the table: "profiles" */
  update_profiles?: Maybe<Profiles_Mutation_Response>;
  /** update single row of the table: "profiles" */
  update_profiles_by_pk?: Maybe<Profiles>;
  /** update data of the table: "warehouses" */
  update_warehouses?: Maybe<Warehouses_Mutation_Response>;
  /** update single row of the table: "warehouses" */
  update_warehouses_by_pk?: Maybe<Warehouses>;
};


/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Accounts_By_PkArgs = {
  user_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Product_PicturesArgs = {
  where: Product_Pictures_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Pictures_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Product_TagsArgs = {
  where: Product_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Tags_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Profile_PicturesArgs = {
  where: Profile_Pictures_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Profile_Pictures_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProfilesArgs = {
  where: Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Profiles_By_PkArgs = {
  name: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_WarehousesArgs = {
  where: Warehouses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Warehouses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
  objects: Array<Accounts_Insert_Input>;
  on_conflict?: Maybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Accounts_OneArgs = {
  object: Accounts_Insert_Input;
  on_conflict?: Maybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_PicturesArgs = {
  objects: Array<Product_Pictures_Insert_Input>;
  on_conflict?: Maybe<Product_Pictures_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Pictures_OneArgs = {
  object: Product_Pictures_Insert_Input;
  on_conflict?: Maybe<Product_Pictures_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_TagsArgs = {
  objects: Array<Product_Tags_Insert_Input>;
  on_conflict?: Maybe<Product_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Tags_OneArgs = {
  object: Product_Tags_Insert_Input;
  on_conflict?: Maybe<Product_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: Maybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Profile_PicturesArgs = {
  objects: Array<Profile_Pictures_Insert_Input>;
  on_conflict?: Maybe<Profile_Pictures_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Profile_Pictures_OneArgs = {
  object: Profile_Pictures_Insert_Input;
  on_conflict?: Maybe<Profile_Pictures_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProfilesArgs = {
  objects: Array<Profiles_Insert_Input>;
  on_conflict?: Maybe<Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Profiles_OneArgs = {
  object: Profiles_Insert_Input;
  on_conflict?: Maybe<Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WarehousesArgs = {
  objects: Array<Warehouses_Insert_Input>;
  on_conflict?: Maybe<Warehouses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Warehouses_OneArgs = {
  object: Warehouses_Insert_Input;
  on_conflict?: Maybe<Warehouses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
  _set?: Maybe<Accounts_Set_Input>;
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Accounts_By_PkArgs = {
  _set?: Maybe<Accounts_Set_Input>;
  pk_columns: Accounts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_PicturesArgs = {
  _set?: Maybe<Product_Pictures_Set_Input>;
  where: Product_Pictures_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Pictures_By_PkArgs = {
  _set?: Maybe<Product_Pictures_Set_Input>;
  pk_columns: Product_Pictures_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_TagsArgs = {
  _set?: Maybe<Product_Tags_Set_Input>;
  where: Product_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Tags_By_PkArgs = {
  _set?: Maybe<Product_Tags_Set_Input>;
  pk_columns: Product_Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _inc?: Maybe<Products_Inc_Input>;
  _set?: Maybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _inc?: Maybe<Products_Inc_Input>;
  _set?: Maybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Profile_PicturesArgs = {
  _set?: Maybe<Profile_Pictures_Set_Input>;
  where: Profile_Pictures_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Profile_Pictures_By_PkArgs = {
  _set?: Maybe<Profile_Pictures_Set_Input>;
  pk_columns: Profile_Pictures_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProfilesArgs = {
  _set?: Maybe<Profiles_Set_Input>;
  where: Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Profiles_By_PkArgs = {
  _set?: Maybe<Profiles_Set_Input>;
  pk_columns: Profiles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WarehousesArgs = {
  _set?: Maybe<Warehouses_Set_Input>;
  where: Warehouses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Warehouses_By_PkArgs = {
  _set?: Maybe<Warehouses_Set_Input>;
  pk_columns: Warehouses_Pk_Columns_Input;
};


/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "product_pictures" */
export type Product_Pictures = {
  __typename?: 'product_pictures';
  id: Scalars['uuid'];
  picture_url?: Maybe<Scalars['String']>;
  primary: Scalars['Boolean'];
  product_id: Scalars['uuid'];
};

/** aggregated selection of "product_pictures" */
export type Product_Pictures_Aggregate = {
  __typename?: 'product_pictures_aggregate';
  aggregate?: Maybe<Product_Pictures_Aggregate_Fields>;
  nodes: Array<Product_Pictures>;
};

/** aggregate fields of "product_pictures" */
export type Product_Pictures_Aggregate_Fields = {
  __typename?: 'product_pictures_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Product_Pictures_Max_Fields>;
  min?: Maybe<Product_Pictures_Min_Fields>;
};


/** aggregate fields of "product_pictures" */
export type Product_Pictures_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Pictures_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_pictures" */
export type Product_Pictures_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Pictures_Max_Order_By>;
  min?: Maybe<Product_Pictures_Min_Order_By>;
};

/** input type for inserting array relation for remote table "product_pictures" */
export type Product_Pictures_Arr_Rel_Insert_Input = {
  data: Array<Product_Pictures_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Pictures_On_Conflict>;
};

/** Boolean expression to filter rows from the table "product_pictures". All fields are combined with a logical 'AND'. */
export type Product_Pictures_Bool_Exp = {
  _and?: Maybe<Array<Product_Pictures_Bool_Exp>>;
  _not?: Maybe<Product_Pictures_Bool_Exp>;
  _or?: Maybe<Array<Product_Pictures_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  picture_url?: Maybe<String_Comparison_Exp>;
  primary?: Maybe<Boolean_Comparison_Exp>;
  product_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_pictures" */
export enum Product_Pictures_Constraint {
  /** unique or primary key constraint */
  ProductPicturesPkey = 'product_pictures_pkey'
}

/** input type for inserting data into table "product_pictures" */
export type Product_Pictures_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  product_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Product_Pictures_Max_Fields = {
  __typename?: 'product_pictures_max_fields';
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "product_pictures" */
export type Product_Pictures_Max_Order_By = {
  id?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Pictures_Min_Fields = {
  __typename?: 'product_pictures_min_fields';
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "product_pictures" */
export type Product_Pictures_Min_Order_By = {
  id?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "product_pictures" */
export type Product_Pictures_Mutation_Response = {
  __typename?: 'product_pictures_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Pictures>;
};

/** on conflict condition type for table "product_pictures" */
export type Product_Pictures_On_Conflict = {
  constraint: Product_Pictures_Constraint;
  update_columns: Array<Product_Pictures_Update_Column>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};

/** Ordering options when selecting data from "product_pictures". */
export type Product_Pictures_Order_By = {
  id?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  primary?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
};

/** primary key columns input for table: product_pictures */
export type Product_Pictures_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "product_pictures" */
export enum Product_Pictures_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Primary = 'primary',
  /** column name */
  ProductId = 'product_id'
}

/** input type for updating data in table "product_pictures" */
export type Product_Pictures_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  product_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "product_pictures" */
export enum Product_Pictures_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Primary = 'primary',
  /** column name */
  ProductId = 'product_id'
}

/** columns and relationships of "product_tags" */
export type Product_Tags = {
  __typename?: 'product_tags';
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "product_tags" */
export type Product_TagsProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** columns and relationships of "product_tags" */
export type Product_TagsProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** aggregated selection of "product_tags" */
export type Product_Tags_Aggregate = {
  __typename?: 'product_tags_aggregate';
  aggregate?: Maybe<Product_Tags_Aggregate_Fields>;
  nodes: Array<Product_Tags>;
};

/** aggregate fields of "product_tags" */
export type Product_Tags_Aggregate_Fields = {
  __typename?: 'product_tags_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Product_Tags_Max_Fields>;
  min?: Maybe<Product_Tags_Min_Fields>;
};


/** aggregate fields of "product_tags" */
export type Product_Tags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Tags_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "product_tags". All fields are combined with a logical 'AND'. */
export type Product_Tags_Bool_Exp = {
  _and?: Maybe<Array<Product_Tags_Bool_Exp>>;
  _not?: Maybe<Product_Tags_Bool_Exp>;
  _or?: Maybe<Array<Product_Tags_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  products?: Maybe<Products_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_tags" */
export enum Product_Tags_Constraint {
  /** unique or primary key constraint */
  ProductTagsNameKey = 'product_tags_name_key',
  /** unique or primary key constraint */
  ProductTagsPkey = 'product_tags_pkey'
}

/** input type for inserting data into table "product_tags" */
export type Product_Tags_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Products_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Product_Tags_Max_Fields = {
  __typename?: 'product_tags_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Product_Tags_Min_Fields = {
  __typename?: 'product_tags_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "product_tags" */
export type Product_Tags_Mutation_Response = {
  __typename?: 'product_tags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Tags>;
};

/** input type for inserting object relation for remote table "product_tags" */
export type Product_Tags_Obj_Rel_Insert_Input = {
  data: Product_Tags_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Tags_On_Conflict>;
};

/** on conflict condition type for table "product_tags" */
export type Product_Tags_On_Conflict = {
  constraint: Product_Tags_Constraint;
  update_columns: Array<Product_Tags_Update_Column>;
  where?: Maybe<Product_Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "product_tags". */
export type Product_Tags_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: product_tags */
export type Product_Tags_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "product_tags" */
export enum Product_Tags_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "product_tags" */
export type Product_Tags_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "product_tags" */
export enum Product_Tags_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "products" */
export type Products = {
  __typename?: 'products';
  best_price: Scalars['numeric'];
  buy_price: Scalars['numeric'];
  created_at: Scalars['timestamptz'];
  downline_price: Scalars['numeric'];
  id: Scalars['uuid'];
  /** fetch data from the table: "product_pictures" */
  product_pictures: Array<Product_Pictures>;
  /** fetch aggregated fields from the table: "product_pictures" */
  product_pictures_aggregate: Product_Pictures_Aggregate;
  /** An object relationship */
  product_tag?: Maybe<Product_Tags>;
  retail_price: Scalars['numeric'];
  sellable: Scalars['Boolean'];
  sku: Scalars['String'];
  tag_id?: Maybe<Scalars['uuid']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "products" */
export type ProductsProduct_PicturesArgs = {
  distinct_on?: Maybe<Array<Product_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Pictures_Order_By>>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsProduct_Pictures_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Pictures_Order_By>>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};

/** aggregated selection of "products" */
export type Products_Aggregate = {
  __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

/** aggregate fields of "products" */
export type Products_Aggregate_Fields = {
  __typename?: 'products_aggregate_fields';
  avg?: Maybe<Products_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
  stddev?: Maybe<Products_Stddev_Fields>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Fields>;
  sum?: Maybe<Products_Sum_Fields>;
  var_pop?: Maybe<Products_Var_Pop_Fields>;
  var_samp?: Maybe<Products_Var_Samp_Fields>;
  variance?: Maybe<Products_Variance_Fields>;
};


/** aggregate fields of "products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Products_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "products" */
export type Products_Aggregate_Order_By = {
  avg?: Maybe<Products_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Products_Max_Order_By>;
  min?: Maybe<Products_Min_Order_By>;
  stddev?: Maybe<Products_Stddev_Order_By>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Order_By>;
  sum?: Maybe<Products_Sum_Order_By>;
  var_pop?: Maybe<Products_Var_Pop_Order_By>;
  var_samp?: Maybe<Products_Var_Samp_Order_By>;
  variance?: Maybe<Products_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "products" */
export type Products_Arr_Rel_Insert_Input = {
  data: Array<Products_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** aggregate avg on columns */
export type Products_Avg_Fields = {
  __typename?: 'products_avg_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "products" */
export type Products_Avg_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: Maybe<Array<Products_Bool_Exp>>;
  _not?: Maybe<Products_Bool_Exp>;
  _or?: Maybe<Array<Products_Bool_Exp>>;
  best_price?: Maybe<Numeric_Comparison_Exp>;
  buy_price?: Maybe<Numeric_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  downline_price?: Maybe<Numeric_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  product_pictures?: Maybe<Product_Pictures_Bool_Exp>;
  product_tag?: Maybe<Product_Tags_Bool_Exp>;
  retail_price?: Maybe<Numeric_Comparison_Exp>;
  sellable?: Maybe<Boolean_Comparison_Exp>;
  sku?: Maybe<String_Comparison_Exp>;
  tag_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  ProductsPkey = 'products_pkey',
  /** unique or primary key constraint */
  ProductsSkuKey = 'products_sku_key'
}

/** input type for incrementing numeric columns in table "products" */
export type Products_Inc_Input = {
  best_price?: Maybe<Scalars['numeric']>;
  buy_price?: Maybe<Scalars['numeric']>;
  downline_price?: Maybe<Scalars['numeric']>;
  retail_price?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  best_price?: Maybe<Scalars['numeric']>;
  buy_price?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  downline_price?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  product_pictures?: Maybe<Product_Pictures_Arr_Rel_Insert_Input>;
  product_tag?: Maybe<Product_Tags_Obj_Rel_Insert_Input>;
  retail_price?: Maybe<Scalars['numeric']>;
  sellable?: Maybe<Scalars['Boolean']>;
  sku?: Maybe<Scalars['String']>;
  tag_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'products_max_fields';
  best_price?: Maybe<Scalars['numeric']>;
  buy_price?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  downline_price?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  retail_price?: Maybe<Scalars['numeric']>;
  sku?: Maybe<Scalars['String']>;
  tag_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "products" */
export type Products_Max_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
  sku?: Maybe<Order_By>;
  tag_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'products_min_fields';
  best_price?: Maybe<Scalars['numeric']>;
  buy_price?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  downline_price?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  retail_price?: Maybe<Scalars['numeric']>;
  sku?: Maybe<Scalars['String']>;
  tag_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "products" */
export type Products_Min_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
  sku?: Maybe<Order_By>;
  tag_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** on conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns: Array<Products_Update_Column>;
  where?: Maybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  product_pictures_aggregate?: Maybe<Product_Pictures_Aggregate_Order_By>;
  product_tag?: Maybe<Product_Tags_Order_By>;
  retail_price?: Maybe<Order_By>;
  sellable?: Maybe<Order_By>;
  sku?: Maybe<Order_By>;
  tag_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  BestPrice = 'best_price',
  /** column name */
  BuyPrice = 'buy_price',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DownlinePrice = 'downline_price',
  /** column name */
  Id = 'id',
  /** column name */
  RetailPrice = 'retail_price',
  /** column name */
  Sellable = 'sellable',
  /** column name */
  Sku = 'sku',
  /** column name */
  TagId = 'tag_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  best_price?: Maybe<Scalars['numeric']>;
  buy_price?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  downline_price?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  retail_price?: Maybe<Scalars['numeric']>;
  sellable?: Maybe<Scalars['Boolean']>;
  sku?: Maybe<Scalars['String']>;
  tag_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Products_Stddev_Fields = {
  __typename?: 'products_stddev_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "products" */
export type Products_Stddev_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Products_Stddev_Pop_Fields = {
  __typename?: 'products_stddev_pop_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "products" */
export type Products_Stddev_Pop_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Products_Stddev_Samp_Fields = {
  __typename?: 'products_stddev_samp_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "products" */
export type Products_Stddev_Samp_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Products_Sum_Fields = {
  __typename?: 'products_sum_fields';
  best_price?: Maybe<Scalars['numeric']>;
  buy_price?: Maybe<Scalars['numeric']>;
  downline_price?: Maybe<Scalars['numeric']>;
  retail_price?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "products" */
export type Products_Sum_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  BestPrice = 'best_price',
  /** column name */
  BuyPrice = 'buy_price',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DownlinePrice = 'downline_price',
  /** column name */
  Id = 'id',
  /** column name */
  RetailPrice = 'retail_price',
  /** column name */
  Sellable = 'sellable',
  /** column name */
  Sku = 'sku',
  /** column name */
  TagId = 'tag_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Products_Var_Pop_Fields = {
  __typename?: 'products_var_pop_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "products" */
export type Products_Var_Pop_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Products_Var_Samp_Fields = {
  __typename?: 'products_var_samp_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "products" */
export type Products_Var_Samp_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Products_Variance_Fields = {
  __typename?: 'products_variance_fields';
  best_price?: Maybe<Scalars['Float']>;
  buy_price?: Maybe<Scalars['Float']>;
  downline_price?: Maybe<Scalars['Float']>;
  retail_price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "products" */
export type Products_Variance_Order_By = {
  best_price?: Maybe<Order_By>;
  buy_price?: Maybe<Order_By>;
  downline_price?: Maybe<Order_By>;
  retail_price?: Maybe<Order_By>;
};

/** columns and relationships of "profile_pictures" */
export type Profile_Pictures = {
  __typename?: 'profile_pictures';
  account_id: Scalars['uuid'];
  id: Scalars['uuid'];
  picture_url: Scalars['String'];
  primary: Scalars['Boolean'];
};

/** aggregated selection of "profile_pictures" */
export type Profile_Pictures_Aggregate = {
  __typename?: 'profile_pictures_aggregate';
  aggregate?: Maybe<Profile_Pictures_Aggregate_Fields>;
  nodes: Array<Profile_Pictures>;
};

/** aggregate fields of "profile_pictures" */
export type Profile_Pictures_Aggregate_Fields = {
  __typename?: 'profile_pictures_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Profile_Pictures_Max_Fields>;
  min?: Maybe<Profile_Pictures_Min_Fields>;
};


/** aggregate fields of "profile_pictures" */
export type Profile_Pictures_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Profile_Pictures_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "profile_pictures" */
export type Profile_Pictures_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Profile_Pictures_Max_Order_By>;
  min?: Maybe<Profile_Pictures_Min_Order_By>;
};

/** input type for inserting array relation for remote table "profile_pictures" */
export type Profile_Pictures_Arr_Rel_Insert_Input = {
  data: Array<Profile_Pictures_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Profile_Pictures_On_Conflict>;
};

/** Boolean expression to filter rows from the table "profile_pictures". All fields are combined with a logical 'AND'. */
export type Profile_Pictures_Bool_Exp = {
  _and?: Maybe<Array<Profile_Pictures_Bool_Exp>>;
  _not?: Maybe<Profile_Pictures_Bool_Exp>;
  _or?: Maybe<Array<Profile_Pictures_Bool_Exp>>;
  account_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  picture_url?: Maybe<String_Comparison_Exp>;
  primary?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "profile_pictures" */
export enum Profile_Pictures_Constraint {
  /** unique or primary key constraint */
  ProfilePicturesPkey = 'profile_pictures_pkey'
}

/** input type for inserting data into table "profile_pictures" */
export type Profile_Pictures_Insert_Input = {
  account_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Profile_Pictures_Max_Fields = {
  __typename?: 'profile_pictures_max_fields';
  account_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "profile_pictures" */
export type Profile_Pictures_Max_Order_By = {
  account_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Profile_Pictures_Min_Fields = {
  __typename?: 'profile_pictures_min_fields';
  account_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "profile_pictures" */
export type Profile_Pictures_Min_Order_By = {
  account_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
};

/** response of any mutation on the table "profile_pictures" */
export type Profile_Pictures_Mutation_Response = {
  __typename?: 'profile_pictures_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Profile_Pictures>;
};

/** on conflict condition type for table "profile_pictures" */
export type Profile_Pictures_On_Conflict = {
  constraint: Profile_Pictures_Constraint;
  update_columns: Array<Profile_Pictures_Update_Column>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};

/** Ordering options when selecting data from "profile_pictures". */
export type Profile_Pictures_Order_By = {
  account_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  primary?: Maybe<Order_By>;
};

/** primary key columns input for table: profile_pictures */
export type Profile_Pictures_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "profile_pictures" */
export enum Profile_Pictures_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Id = 'id',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Primary = 'primary'
}

/** input type for updating data in table "profile_pictures" */
export type Profile_Pictures_Set_Input = {
  account_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  picture_url?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
};

/** update columns of table "profile_pictures" */
export enum Profile_Pictures_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Id = 'id',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Primary = 'primary'
}

/** columns and relationships of "profiles" */
export type Profiles = {
  __typename?: 'profiles';
  account_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  locked: Scalars['Boolean'];
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "profiles" */
export type Profiles_Aggregate = {
  __typename?: 'profiles_aggregate';
  aggregate?: Maybe<Profiles_Aggregate_Fields>;
  nodes: Array<Profiles>;
};

/** aggregate fields of "profiles" */
export type Profiles_Aggregate_Fields = {
  __typename?: 'profiles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Profiles_Max_Fields>;
  min?: Maybe<Profiles_Min_Fields>;
};


/** aggregate fields of "profiles" */
export type Profiles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Profiles_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "profiles". All fields are combined with a logical 'AND'. */
export type Profiles_Bool_Exp = {
  _and?: Maybe<Array<Profiles_Bool_Exp>>;
  _not?: Maybe<Profiles_Bool_Exp>;
  _or?: Maybe<Array<Profiles_Bool_Exp>>;
  account_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  locked?: Maybe<Boolean_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "profiles" */
export enum Profiles_Constraint {
  /** unique or primary key constraint */
  ProfilesAccountIdKey = 'profiles_account_id_key',
  /** unique or primary key constraint */
  ProfilesPkey = 'profiles_pkey'
}

/** input type for inserting data into table "profiles" */
export type Profiles_Insert_Input = {
  account_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  locked?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Profiles_Max_Fields = {
  __typename?: 'profiles_max_fields';
  account_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Profiles_Min_Fields = {
  __typename?: 'profiles_min_fields';
  account_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "profiles" */
export type Profiles_Mutation_Response = {
  __typename?: 'profiles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Profiles>;
};

/** input type for inserting object relation for remote table "profiles" */
export type Profiles_Obj_Rel_Insert_Input = {
  data: Profiles_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Profiles_On_Conflict>;
};

/** on conflict condition type for table "profiles" */
export type Profiles_On_Conflict = {
  constraint: Profiles_Constraint;
  update_columns: Array<Profiles_Update_Column>;
  where?: Maybe<Profiles_Bool_Exp>;
};

/** Ordering options when selecting data from "profiles". */
export type Profiles_Order_By = {
  account_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  locked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: profiles */
export type Profiles_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "profiles" */
export enum Profiles_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Locked = 'locked',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "profiles" */
export type Profiles_Set_Input = {
  account_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  locked?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "profiles" */
export enum Profiles_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Locked = 'locked',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "product_pictures" */
  product_pictures: Array<Product_Pictures>;
  /** fetch aggregated fields from the table: "product_pictures" */
  product_pictures_aggregate: Product_Pictures_Aggregate;
  /** fetch data from the table: "product_pictures" using primary key columns */
  product_pictures_by_pk?: Maybe<Product_Pictures>;
  /** fetch data from the table: "product_tags" */
  product_tags: Array<Product_Tags>;
  /** fetch aggregated fields from the table: "product_tags" */
  product_tags_aggregate: Product_Tags_Aggregate;
  /** fetch data from the table: "product_tags" using primary key columns */
  product_tags_by_pk?: Maybe<Product_Tags>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "profile_pictures" */
  profile_pictures: Array<Profile_Pictures>;
  /** fetch aggregated fields from the table: "profile_pictures" */
  profile_pictures_aggregate: Profile_Pictures_Aggregate;
  /** fetch data from the table: "profile_pictures" using primary key columns */
  profile_pictures_by_pk?: Maybe<Profile_Pictures>;
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk?: Maybe<Profiles>;
  /** fetch data from the table: "warehouses" */
  warehouses: Array<Warehouses>;
  /** fetch aggregated fields from the table: "warehouses" */
  warehouses_aggregate: Warehouses_Aggregate;
  /** fetch data from the table: "warehouses" using primary key columns */
  warehouses_by_pk?: Maybe<Warehouses>;
};


export type Query_RootAccountsArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_By_PkArgs = {
  user_id: Scalars['uuid'];
};


export type Query_RootProduct_PicturesArgs = {
  distinct_on?: Maybe<Array<Product_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Pictures_Order_By>>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};


export type Query_RootProduct_Pictures_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Pictures_Order_By>>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};


export type Query_RootProduct_Pictures_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProduct_TagsArgs = {
  distinct_on?: Maybe<Array<Product_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Tags_Order_By>>;
  where?: Maybe<Product_Tags_Bool_Exp>;
};


export type Query_RootProduct_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Tags_Order_By>>;
  where?: Maybe<Product_Tags_Bool_Exp>;
};


export type Query_RootProduct_Tags_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProfile_PicturesArgs = {
  distinct_on?: Maybe<Array<Profile_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Pictures_Order_By>>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};


export type Query_RootProfile_Pictures_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Pictures_Order_By>>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};


export type Query_RootProfile_Pictures_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProfilesArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_AggregateArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootWarehousesArgs = {
  distinct_on?: Maybe<Array<Warehouses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Warehouses_Order_By>>;
  where?: Maybe<Warehouses_Bool_Exp>;
};


export type Query_RootWarehouses_AggregateArgs = {
  distinct_on?: Maybe<Array<Warehouses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Warehouses_Order_By>>;
  where?: Maybe<Warehouses_Bool_Exp>;
};


export type Query_RootWarehouses_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "product_pictures" */
  product_pictures: Array<Product_Pictures>;
  /** fetch aggregated fields from the table: "product_pictures" */
  product_pictures_aggregate: Product_Pictures_Aggregate;
  /** fetch data from the table: "product_pictures" using primary key columns */
  product_pictures_by_pk?: Maybe<Product_Pictures>;
  /** fetch data from the table: "product_tags" */
  product_tags: Array<Product_Tags>;
  /** fetch aggregated fields from the table: "product_tags" */
  product_tags_aggregate: Product_Tags_Aggregate;
  /** fetch data from the table: "product_tags" using primary key columns */
  product_tags_by_pk?: Maybe<Product_Tags>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "profile_pictures" */
  profile_pictures: Array<Profile_Pictures>;
  /** fetch aggregated fields from the table: "profile_pictures" */
  profile_pictures_aggregate: Profile_Pictures_Aggregate;
  /** fetch data from the table: "profile_pictures" using primary key columns */
  profile_pictures_by_pk?: Maybe<Profile_Pictures>;
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk?: Maybe<Profiles>;
  /** fetch data from the table: "warehouses" */
  warehouses: Array<Warehouses>;
  /** fetch aggregated fields from the table: "warehouses" */
  warehouses_aggregate: Warehouses_Aggregate;
  /** fetch data from the table: "warehouses" using primary key columns */
  warehouses_by_pk?: Maybe<Warehouses>;
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_By_PkArgs = {
  user_id: Scalars['uuid'];
};


export type Subscription_RootProduct_PicturesArgs = {
  distinct_on?: Maybe<Array<Product_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Pictures_Order_By>>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};


export type Subscription_RootProduct_Pictures_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Pictures_Order_By>>;
  where?: Maybe<Product_Pictures_Bool_Exp>;
};


export type Subscription_RootProduct_Pictures_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProduct_TagsArgs = {
  distinct_on?: Maybe<Array<Product_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Tags_Order_By>>;
  where?: Maybe<Product_Tags_Bool_Exp>;
};


export type Subscription_RootProduct_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Tags_Order_By>>;
  where?: Maybe<Product_Tags_Bool_Exp>;
};


export type Subscription_RootProduct_Tags_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProfile_PicturesArgs = {
  distinct_on?: Maybe<Array<Profile_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Pictures_Order_By>>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};


export type Subscription_RootProfile_Pictures_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Pictures_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Pictures_Order_By>>;
  where?: Maybe<Profile_Pictures_Bool_Exp>;
};


export type Subscription_RootProfile_Pictures_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProfilesArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_AggregateArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootWarehousesArgs = {
  distinct_on?: Maybe<Array<Warehouses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Warehouses_Order_By>>;
  where?: Maybe<Warehouses_Bool_Exp>;
};


export type Subscription_RootWarehouses_AggregateArgs = {
  distinct_on?: Maybe<Array<Warehouses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Warehouses_Order_By>>;
  where?: Maybe<Warehouses_Bool_Exp>;
};


export type Subscription_RootWarehouses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "warehouses" */
export type Warehouses = {
  __typename?: 'warehouses';
  address: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "warehouses" */
export type Warehouses_Aggregate = {
  __typename?: 'warehouses_aggregate';
  aggregate?: Maybe<Warehouses_Aggregate_Fields>;
  nodes: Array<Warehouses>;
};

/** aggregate fields of "warehouses" */
export type Warehouses_Aggregate_Fields = {
  __typename?: 'warehouses_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Warehouses_Max_Fields>;
  min?: Maybe<Warehouses_Min_Fields>;
};


/** aggregate fields of "warehouses" */
export type Warehouses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Warehouses_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "warehouses". All fields are combined with a logical 'AND'. */
export type Warehouses_Bool_Exp = {
  _and?: Maybe<Array<Warehouses_Bool_Exp>>;
  _not?: Maybe<Warehouses_Bool_Exp>;
  _or?: Maybe<Array<Warehouses_Bool_Exp>>;
  address?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "warehouses" */
export enum Warehouses_Constraint {
  /** unique or primary key constraint */
  WarehousesNameKey = 'warehouses_name_key',
  /** unique or primary key constraint */
  WarehousesPkey = 'warehouses_pkey'
}

/** input type for inserting data into table "warehouses" */
export type Warehouses_Insert_Input = {
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Warehouses_Max_Fields = {
  __typename?: 'warehouses_max_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Warehouses_Min_Fields = {
  __typename?: 'warehouses_min_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "warehouses" */
export type Warehouses_Mutation_Response = {
  __typename?: 'warehouses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Warehouses>;
};

/** on conflict condition type for table "warehouses" */
export type Warehouses_On_Conflict = {
  constraint: Warehouses_Constraint;
  update_columns: Array<Warehouses_Update_Column>;
  where?: Maybe<Warehouses_Bool_Exp>;
};

/** Ordering options when selecting data from "warehouses". */
export type Warehouses_Order_By = {
  address?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: warehouses */
export type Warehouses_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "warehouses" */
export enum Warehouses_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "warehouses" */
export type Warehouses_Set_Input = {
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "warehouses" */
export enum Warehouses_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type UpdateProductTagMutationVariables = Exact<{
  tagId: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}>;


export type UpdateProductTagMutation = (
  { __typename?: 'mutation_root' }
  & { update_product_tags?: Maybe<(
    { __typename?: 'product_tags_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product_tags' }
      & Pick<Product_Tags, 'id' | 'name' | 'description'>
    )> }
  )> }
);

export type InsertProductTagMutationVariables = Exact<{
  tagId: Scalars['uuid'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type InsertProductTagMutation = (
  { __typename?: 'mutation_root' }
  & { insert_product_tags_one?: Maybe<(
    { __typename?: 'product_tags' }
    & Pick<Product_Tags, 'name' | 'description' | 'created_at' | 'updated_at'>
  )> }
);

export type UpsertProfileMutationVariables = Exact<{
  accountId: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type UpsertProfileMutation = (
  { __typename?: 'mutation_root' }
  & { insert_profiles_one?: Maybe<(
    { __typename?: 'profiles' }
    & Pick<Profiles, 'name'>
  )> }
);

export type ListProductTagsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type ListProductTagsQuery = (
  { __typename?: 'query_root' }
  & { product_tags: Array<(
    { __typename?: 'product_tags' }
    & Pick<Product_Tags, 'id' | 'name' | 'description' | 'created_at' | 'updated_at'>
  )> }
);

export type GetProductTagQueryVariables = Exact<{
  tagId: Scalars['uuid'];
}>;


export type GetProductTagQuery = (
  { __typename?: 'query_root' }
  & { product_tags: Array<(
    { __typename?: 'product_tags' }
    & Pick<Product_Tags, 'id' | 'name' | 'description' | 'created_at' | 'updated_at'>
  )> }
);

export type GetAccountQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetAccountQuery = (
  { __typename?: 'query_root' }
  & { accounts: Array<(
    { __typename?: 'accounts' }
    & Pick<Accounts, 'email' | 'role' | 'last_login'>
    & { profile?: Maybe<(
      { __typename?: 'profiles' }
      & Pick<Profiles, 'name' | 'locked' | 'created_at' | 'updated_at'>
    )>, profile_pictures: Array<(
      { __typename?: 'profile_pictures' }
      & Pick<Profile_Pictures, 'picture_url' | 'primary'>
    )> }
  )> }
);

export type ListAccountQueryVariables = Exact<{
  last_login: Scalars['timestamptz'];
}>;


export type ListAccountQuery = (
  { __typename?: 'query_root' }
  & { accounts: Array<(
    { __typename?: 'accounts' }
    & Pick<Accounts, 'user_id' | 'email' | 'role' | 'last_login'>
    & { profile?: Maybe<(
      { __typename?: 'profiles' }
      & Pick<Profiles, 'locked' | 'name' | 'created_at' | 'updated_at'>
    )>, profile_pictures: Array<(
      { __typename?: 'profile_pictures' }
      & Pick<Profile_Pictures, 'picture_url' | 'primary'>
    )> }
  )> }
);

export type GetProfilePictureQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetProfilePictureQuery = (
  { __typename?: 'query_root' }
  & { profile_pictures: Array<(
    { __typename?: 'profile_pictures' }
    & Pick<Profile_Pictures, 'id' | 'picture_url' | 'primary'>
  )> }
);


export const UpdateProductTagDocument = gql`
    mutation updateProductTag($tagId: uuid!, $name: String, $description: String) {
  update_product_tags(
    where: {id: {_eq: $tagId}}
    _set: {name: $name, description: $description}
  ) {
    returning {
      id
      name
      description
    }
  }
}
    `;
export type UpdateProductTagMutationFn = Apollo.MutationFunction<UpdateProductTagMutation, UpdateProductTagMutationVariables>;

/**
 * __useUpdateProductTagMutation__
 *
 * To run a mutation, you first call `useUpdateProductTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductTagMutation, { data, loading, error }] = useUpdateProductTagMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateProductTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductTagMutation, UpdateProductTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductTagMutation, UpdateProductTagMutationVariables>(UpdateProductTagDocument, options);
      }
export type UpdateProductTagMutationHookResult = ReturnType<typeof useUpdateProductTagMutation>;
export type UpdateProductTagMutationResult = Apollo.MutationResult<UpdateProductTagMutation>;
export type UpdateProductTagMutationOptions = Apollo.BaseMutationOptions<UpdateProductTagMutation, UpdateProductTagMutationVariables>;
export const InsertProductTagDocument = gql`
    mutation insertProductTag($tagId: uuid!, $name: String!, $description: String!) {
  insert_product_tags_one(
    object: {id: $tagId, name: $name, description: $description}
    on_conflict: {constraint: product_tags_name_key, update_columns: [name, description, updated_at]}
  ) {
    name
    description
    created_at
    updated_at
  }
}
    `;
export type InsertProductTagMutationFn = Apollo.MutationFunction<InsertProductTagMutation, InsertProductTagMutationVariables>;

/**
 * __useInsertProductTagMutation__
 *
 * To run a mutation, you first call `useInsertProductTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProductTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProductTagMutation, { data, loading, error }] = useInsertProductTagMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useInsertProductTagMutation(baseOptions?: Apollo.MutationHookOptions<InsertProductTagMutation, InsertProductTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertProductTagMutation, InsertProductTagMutationVariables>(InsertProductTagDocument, options);
      }
export type InsertProductTagMutationHookResult = ReturnType<typeof useInsertProductTagMutation>;
export type InsertProductTagMutationResult = Apollo.MutationResult<InsertProductTagMutation>;
export type InsertProductTagMutationOptions = Apollo.BaseMutationOptions<InsertProductTagMutation, InsertProductTagMutationVariables>;
export const UpsertProfileDocument = gql`
    mutation upsertProfile($accountId: uuid!, $name: String!) {
  insert_profiles_one(object: {account_id: $accountId, name: $name}) {
    name
  }
}
    `;
export type UpsertProfileMutationFn = Apollo.MutationFunction<UpsertProfileMutation, UpsertProfileMutationVariables>;

/**
 * __useUpsertProfileMutation__
 *
 * To run a mutation, you first call `useUpsertProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertProfileMutation, { data, loading, error }] = useUpsertProfileMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpsertProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpsertProfileMutation, UpsertProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertProfileMutation, UpsertProfileMutationVariables>(UpsertProfileDocument, options);
      }
export type UpsertProfileMutationHookResult = ReturnType<typeof useUpsertProfileMutation>;
export type UpsertProfileMutationResult = Apollo.MutationResult<UpsertProfileMutation>;
export type UpsertProfileMutationOptions = Apollo.BaseMutationOptions<UpsertProfileMutation, UpsertProfileMutationVariables>;
export const ListProductTagsDocument = gql`
    query listProductTags($query: String!) {
  product_tags(where: {name: {_ilike: $query}}) {
    id
    name
    description
    created_at
    updated_at
  }
}
    `;

/**
 * __useListProductTagsQuery__
 *
 * To run a query within a React component, call `useListProductTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProductTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductTagsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useListProductTagsQuery(baseOptions: Apollo.QueryHookOptions<ListProductTagsQuery, ListProductTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProductTagsQuery, ListProductTagsQueryVariables>(ListProductTagsDocument, options);
      }
export function useListProductTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProductTagsQuery, ListProductTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProductTagsQuery, ListProductTagsQueryVariables>(ListProductTagsDocument, options);
        }
export type ListProductTagsQueryHookResult = ReturnType<typeof useListProductTagsQuery>;
export type ListProductTagsLazyQueryHookResult = ReturnType<typeof useListProductTagsLazyQuery>;
export type ListProductTagsQueryResult = Apollo.QueryResult<ListProductTagsQuery, ListProductTagsQueryVariables>;
export const GetProductTagDocument = gql`
    query getProductTag($tagId: uuid!) {
  product_tags(where: {id: {_eq: $tagId}}) {
    id
    name
    description
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetProductTagQuery__
 *
 * To run a query within a React component, call `useGetProductTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductTagQuery({
 *   variables: {
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useGetProductTagQuery(baseOptions: Apollo.QueryHookOptions<GetProductTagQuery, GetProductTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductTagQuery, GetProductTagQueryVariables>(GetProductTagDocument, options);
      }
export function useGetProductTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductTagQuery, GetProductTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductTagQuery, GetProductTagQueryVariables>(GetProductTagDocument, options);
        }
export type GetProductTagQueryHookResult = ReturnType<typeof useGetProductTagQuery>;
export type GetProductTagLazyQueryHookResult = ReturnType<typeof useGetProductTagLazyQuery>;
export type GetProductTagQueryResult = Apollo.QueryResult<GetProductTagQuery, GetProductTagQueryVariables>;
export const GetAccountDocument = gql`
    query getAccount($id: uuid!) {
  accounts(where: {user_id: {_eq: $id}}) {
    email
    role
    profile {
      name
      locked
      created_at
      updated_at
    }
    profile_pictures {
      picture_url
      primary
    }
    last_login
  }
}
    `;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const ListAccountDocument = gql`
    query listAccount($last_login: timestamptz!) {
  accounts(where: {last_login: {_gt: $last_login}}, limit: 10) {
    user_id
    email
    role
    last_login
    profile {
      locked
      name
      created_at
      updated_at
    }
    profile_pictures {
      picture_url
      primary
    }
  }
}
    `;

/**
 * __useListAccountQuery__
 *
 * To run a query within a React component, call `useListAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAccountQuery({
 *   variables: {
 *      last_login: // value for 'last_login'
 *   },
 * });
 */
export function useListAccountQuery(baseOptions: Apollo.QueryHookOptions<ListAccountQuery, ListAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListAccountQuery, ListAccountQueryVariables>(ListAccountDocument, options);
      }
export function useListAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListAccountQuery, ListAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListAccountQuery, ListAccountQueryVariables>(ListAccountDocument, options);
        }
export type ListAccountQueryHookResult = ReturnType<typeof useListAccountQuery>;
export type ListAccountLazyQueryHookResult = ReturnType<typeof useListAccountLazyQuery>;
export type ListAccountQueryResult = Apollo.QueryResult<ListAccountQuery, ListAccountQueryVariables>;
export const GetProfilePictureDocument = gql`
    query getProfilePicture($id: uuid!) {
  profile_pictures(where: {account_id: {_eq: $id}}) {
    id
    picture_url
    primary
  }
}
    `;

/**
 * __useGetProfilePictureQuery__
 *
 * To run a query within a React component, call `useGetProfilePictureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilePictureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilePictureQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfilePictureQuery(baseOptions: Apollo.QueryHookOptions<GetProfilePictureQuery, GetProfilePictureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfilePictureQuery, GetProfilePictureQueryVariables>(GetProfilePictureDocument, options);
      }
export function useGetProfilePictureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfilePictureQuery, GetProfilePictureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfilePictureQuery, GetProfilePictureQueryVariables>(GetProfilePictureDocument, options);
        }
export type GetProfilePictureQueryHookResult = ReturnType<typeof useGetProfilePictureQuery>;
export type GetProfilePictureLazyQueryHookResult = ReturnType<typeof useGetProfilePictureLazyQuery>;
export type GetProfilePictureQueryResult = Apollo.QueryResult<GetProfilePictureQuery, GetProfilePictureQueryVariables>;