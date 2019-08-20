import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Board = {
  __typename?: 'Board',
  id: Scalars['ID'],
  name: Scalars['String'],
  todos: Array<Todo>,
};

export type ListBoardsInput = {
  _?: Maybe<Scalars['Boolean']>,
};

export type ListBoardsResponse = {
  __typename?: 'ListBoardsResponse',
  boards: Array<Board>,
};

export type ListTodosInput = {
  _?: Maybe<Scalars['Boolean']>,
};

export type ListTodosResponse = {
  __typename?: 'ListTodosResponse',
  todos: Array<Todo>,
};

export type Query = {
  __typename?: 'Query',
  listTodos: ListTodosResponse,
  listBoards: ListBoardsResponse,
};


export type QueryListTodosArgs = {
  input: ListTodosInput
};


export type QueryListBoardsArgs = {
  input: ListBoardsInput
};

export type Todo = {
  __typename?: 'Todo',
  id: Scalars['ID'],
  text: Scalars['String'],
  completed?: Maybe<Scalars['Boolean']>,
  board?: Maybe<Board>,
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ListTodosInput: ListTodosInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ListTodosResponse: ResolverTypeWrapper<ListTodosResponse>,
  Todo: ResolverTypeWrapper<Todo>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Board: ResolverTypeWrapper<Board>,
  ListBoardsInput: ListBoardsInput,
  ListBoardsResponse: ResolverTypeWrapper<ListBoardsResponse>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ListTodosInput: ListTodosInput,
  Boolean: Scalars['Boolean'],
  ListTodosResponse: ListTodosResponse,
  Todo: Todo,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Board: Board,
  ListBoardsInput: ListBoardsInput,
  ListBoardsResponse: ListBoardsResponse,
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>,
};

export type ListBoardsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListBoardsResponse'] = ResolversParentTypes['ListBoardsResponse']> = {
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>,
};

export type ListTodosResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListTodosResponse'] = ResolversParentTypes['ListTodosResponse']> = {
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listTodos?: Resolver<ResolversTypes['ListTodosResponse'], ParentType, ContextType, RequireFields<QueryListTodosArgs, 'input'>>,
  listBoards?: Resolver<ResolversTypes['ListBoardsResponse'], ParentType, ContextType, RequireFields<QueryListBoardsArgs, 'input'>>,
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>,
  ListBoardsResponse?: ListBoardsResponseResolvers<ContextType>,
  ListTodosResponse?: ListTodosResponseResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Todo?: TodoResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
