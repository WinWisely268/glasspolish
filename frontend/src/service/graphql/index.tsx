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
  /** delete data from the table: "profile_pictures" */
  delete_profile_pictures?: Maybe<Profile_Pictures_Mutation_Response>;
  /** delete single row from the table: "profile_pictures" */
  delete_profile_pictures_by_pk?: Maybe<Profile_Pictures>;
  /** delete data from the table: "profiles" */
  delete_profiles?: Maybe<Profiles_Mutation_Response>;
  /** delete single row from the table: "profiles" */
  delete_profiles_by_pk?: Maybe<Profiles>;
  /** insert data into the table: "accounts" */
  insert_accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert a single row into the table: "accounts" */
  insert_accounts_one?: Maybe<Accounts>;
  /** insert data into the table: "profile_pictures" */
  insert_profile_pictures?: Maybe<Profile_Pictures_Mutation_Response>;
  /** insert a single row into the table: "profile_pictures" */
  insert_profile_pictures_one?: Maybe<Profile_Pictures>;
  /** insert data into the table: "profiles" */
  insert_profiles?: Maybe<Profiles_Mutation_Response>;
  /** insert a single row into the table: "profiles" */
  insert_profiles_one?: Maybe<Profiles>;
  /** update data of the table: "accounts" */
  update_accounts?: Maybe<Accounts_Mutation_Response>;
  /** update single row of the table: "accounts" */
  update_accounts_by_pk?: Maybe<Accounts>;
  /** update data of the table: "profile_pictures" */
  update_profile_pictures?: Maybe<Profile_Pictures_Mutation_Response>;
  /** update single row of the table: "profile_pictures" */
  update_profile_pictures_by_pk?: Maybe<Profile_Pictures>;
  /** update data of the table: "profiles" */
  update_profiles?: Maybe<Profiles_Mutation_Response>;
  /** update single row of the table: "profiles" */
  update_profiles_by_pk?: Maybe<Profiles>;
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

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
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