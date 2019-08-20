import { GraphQLResolveInfo } from 'graphql';
import { Todo, Board } from '../../types';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AddTodoToBoardInput = {
  todoId: Scalars['ID'],
  boardId: Scalars['ID'],
};

export type AddTodoToBoardOutput = {
  __typename?: 'AddTodoToBoardOutput',
  _?: Maybe<Scalars['Boolean']>,
};

export type Board = {
  __typename?: 'Board',
  id: Scalars['ID'],
  owner: User,
  name: Scalars['String'],
  todos: Array<Todo>,
};

export type CreateBoardInput = {
  name: Scalars['String'],
};

export type CreateBoardOutput = {
  __typename?: 'CreateBoardOutput',
  board: Board,
};

export type CreateTodoInput = {
  text: Scalars['String'],
};

export type CreateTodoOutput = {
  __typename?: 'CreateTodoOutput',
  todo: Todo,
};

export type ListBoardsInput = {
  _?: Maybe<Scalars['Boolean']>,
};

export type ListBoardsOutput = {
  __typename?: 'ListBoardsOutput',
  boards: Array<Board>,
};

export type ListTodosInput = {
  _?: Maybe<Scalars['Boolean']>,
};

export type ListTodosOutput = {
  __typename?: 'ListTodosOutput',
  todos: Array<Todo>,
};

export type Mutation = {
  __typename?: 'Mutation',
  createTodo: CreateTodoOutput,
  updateTodo: UpdateTodoOutput,
  createBoard: CreateBoardOutput,
  updateBoard: UpdateBoardOutput,
  addTodoToBoard: AddTodoToBoardOutput,
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput
};


export type MutationUpdateBoardArgs = {
  input: UpdateBoardInput
};


export type MutationAddTodoToBoardArgs = {
  input: AddTodoToBoardInput
};

export type Query = {
  __typename?: 'Query',
  listTodos: ListTodosOutput,
  listBoards: ListBoardsOutput,
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
  owner: User,
  text: Scalars['String'],
  completed?: Maybe<Scalars['Boolean']>,
  board?: Maybe<Board>,
};

export type UpdateBoardInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type UpdateBoardOutput = {
  __typename?: 'UpdateBoardOutput',
  board: Board,
};

export type UpdateTodoInput = {
  id: Scalars['ID'],
  text?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
};

export type UpdateTodoOutput = {
  __typename?: 'UpdateTodoOutput',
  todo: Todo,
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
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
  ListTodosOutput: ResolverTypeWrapper<Omit<ListTodosOutput, 'todos'> & { todos: Array<ResolversTypes['Todo']> }>,
  Todo: ResolverTypeWrapper<Todo>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Board: ResolverTypeWrapper<Board>,
  ListBoardsInput: ListBoardsInput,
  ListBoardsOutput: ResolverTypeWrapper<Omit<ListBoardsOutput, 'boards'> & { boards: Array<ResolversTypes['Board']> }>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateTodoInput: CreateTodoInput,
  CreateTodoOutput: ResolverTypeWrapper<Omit<CreateTodoOutput, 'todo'> & { todo: ResolversTypes['Todo'] }>,
  UpdateTodoInput: UpdateTodoInput,
  UpdateTodoOutput: ResolverTypeWrapper<Omit<UpdateTodoOutput, 'todo'> & { todo: ResolversTypes['Todo'] }>,
  CreateBoardInput: CreateBoardInput,
  CreateBoardOutput: ResolverTypeWrapper<Omit<CreateBoardOutput, 'board'> & { board: ResolversTypes['Board'] }>,
  UpdateBoardInput: UpdateBoardInput,
  UpdateBoardOutput: ResolverTypeWrapper<Omit<UpdateBoardOutput, 'board'> & { board: ResolversTypes['Board'] }>,
  AddTodoToBoardInput: AddTodoToBoardInput,
  AddTodoToBoardOutput: ResolverTypeWrapper<AddTodoToBoardOutput>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ListTodosInput: ListTodosInput,
  Boolean: Scalars['Boolean'],
  ListTodosOutput: Omit<ListTodosOutput, 'todos'> & { todos: Array<ResolversTypes['Todo']> },
  Todo: Todo,
  ID: Scalars['ID'],
  User: User,
  String: Scalars['String'],
  Board: Board,
  ListBoardsInput: ListBoardsInput,
  ListBoardsOutput: Omit<ListBoardsOutput, 'boards'> & { boards: Array<ResolversTypes['Board']> },
  Mutation: {},
  CreateTodoInput: CreateTodoInput,
  CreateTodoOutput: Omit<CreateTodoOutput, 'todo'> & { todo: ResolversTypes['Todo'] },
  UpdateTodoInput: UpdateTodoInput,
  UpdateTodoOutput: Omit<UpdateTodoOutput, 'todo'> & { todo: ResolversTypes['Todo'] },
  CreateBoardInput: CreateBoardInput,
  CreateBoardOutput: Omit<CreateBoardOutput, 'board'> & { board: ResolversTypes['Board'] },
  UpdateBoardInput: UpdateBoardInput,
  UpdateBoardOutput: Omit<UpdateBoardOutput, 'board'> & { board: ResolversTypes['Board'] },
  AddTodoToBoardInput: AddTodoToBoardInput,
  AddTodoToBoardOutput: AddTodoToBoardOutput,
};

export type AddTodoToBoardOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddTodoToBoardOutput'] = ResolversParentTypes['AddTodoToBoardOutput']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>,
};

export type CreateBoardOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateBoardOutput'] = ResolversParentTypes['CreateBoardOutput']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>,
};

export type CreateTodoOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTodoOutput'] = ResolversParentTypes['CreateTodoOutput']> = {
  todo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>,
};

export type ListBoardsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListBoardsOutput'] = ResolversParentTypes['ListBoardsOutput']> = {
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>,
};

export type ListTodosOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListTodosOutput'] = ResolversParentTypes['ListTodosOutput']> = {
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTodo?: Resolver<ResolversTypes['CreateTodoOutput'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'input'>>,
  updateTodo?: Resolver<ResolversTypes['UpdateTodoOutput'], ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'input'>>,
  createBoard?: Resolver<ResolversTypes['CreateBoardOutput'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'input'>>,
  updateBoard?: Resolver<ResolversTypes['UpdateBoardOutput'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'input'>>,
  addTodoToBoard?: Resolver<ResolversTypes['AddTodoToBoardOutput'], ParentType, ContextType, RequireFields<MutationAddTodoToBoardArgs, 'input'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listTodos?: Resolver<ResolversTypes['ListTodosOutput'], ParentType, ContextType, RequireFields<QueryListTodosArgs, 'input'>>,
  listBoards?: Resolver<ResolversTypes['ListBoardsOutput'], ParentType, ContextType, RequireFields<QueryListBoardsArgs, 'input'>>,
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType>,
};

export type UpdateBoardOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateBoardOutput'] = ResolversParentTypes['UpdateBoardOutput']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>,
};

export type UpdateTodoOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateTodoOutput'] = ResolversParentTypes['UpdateTodoOutput']> = {
  todo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  AddTodoToBoardOutput?: AddTodoToBoardOutputResolvers<ContextType>,
  Board?: BoardResolvers<ContextType>,
  CreateBoardOutput?: CreateBoardOutputResolvers<ContextType>,
  CreateTodoOutput?: CreateTodoOutputResolvers<ContextType>,
  ListBoardsOutput?: ListBoardsOutputResolvers<ContextType>,
  ListTodosOutput?: ListTodosOutputResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Todo?: TodoResolvers<ContextType>,
  UpdateBoardOutput?: UpdateBoardOutputResolvers<ContextType>,
  UpdateTodoOutput?: UpdateTodoOutputResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
