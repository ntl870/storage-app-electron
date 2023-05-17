import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Computer = {
  ID: Scalars['String'];
  createdDate?: Maybe<Scalars['DateTime']>;
  hostname: Scalars['String'];
  macAddress: Scalars['String'];
  modifiedDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  storagePath: Scalars['String'];
  user: User;
};

export type ConnectComputerInput = {
  hostname: Scalars['String'];
  macAddress: Scalars['String'];
  name: Scalars['String'];
  storagePath: Scalars['String'];
};

export type File = {
  ID: Scalars['String'];
  createdDate?: Maybe<Scalars['DateTime']>;
  fileSize: Scalars['Float'];
  fileType: Scalars['String'];
  folder?: Maybe<Folder>;
  isPublic: Scalars['Boolean'];
  isTrash: Scalars['Boolean'];
  modifiedDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: User;
  ownerID: Scalars['String'];
  readonlyUsers?: Maybe<Array<User>>;
  sharedUsers?: Maybe<Array<User>>;
  starredUsers?: Maybe<Array<User>>;
  url: Scalars['String'];
};

export type Folder = {
  ID: Scalars['String'];
  createdDate?: Maybe<Scalars['DateTime']>;
  files?: Maybe<Array<File>>;
  isPublic: Scalars['Boolean'];
  isTrash: Scalars['Boolean'];
  modifiedDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  ownerID?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  readonlyUsers?: Maybe<Array<User>>;
  rootFolder?: Maybe<Folder>;
  sharedUsers?: Maybe<Array<User>>;
  starredUsers?: Maybe<Array<User>>;
  subFolders?: Maybe<Array<Folder>>;
};

export type GetFoldersByOwnerIdPaginationResponse = {
  hasMore: Scalars['Boolean'];
  results: Array<Folder>;
};

export type Mutation = {
  addSharedUserToFolder: Scalars['String'];
  addUserToFolderReadOnlyUsers: Scalars['String'];
  addUsersToReadonlyFile: Scalars['String'];
  addUsersToSharedUserFile: Scalars['String'];
  bulkCreatePackages: Scalars['String'];
  changeUserRoleInFile: Scalars['String'];
  changeUserRoleInFolder: Scalars['String'];
  connectComputer: Computer;
  createCheckoutSession: Scalars['String'];
  createFolder: Folder;
  deleteFile: Scalars['String'];
  deleteFolder: Scalars['String'];
  emptyUserTrash: Scalars['String'];
  login: Scalars['String'];
  makeCopyOfFile: Scalars['String'];
  makeCopyOfFolder: Scalars['String'];
  moveFileToNewFolder: Scalars['String'];
  moveFileToTrash: File;
  moveFolder: Scalars['String'];
  moveFolderOutOfTrash: Scalars['String'];
  moveFolderToTrash: Scalars['String'];
  removeUserFromFile: Scalars['String'];
  removeUserFromFolder: Scalars['String'];
  renameFile: Scalars['String'];
  renameFolder: Scalars['String'];
  restoreFileFromTrash: File;
  setGeneralAccessOfFile: Scalars['String'];
  setGeneralFolderAccess: Scalars['String'];
  signup: NewUserReturn;
  starFile: Scalars['String'];
  starFolder: Scalars['String'];
  unstarFile: Scalars['String'];
  unstarFolder: Scalars['String'];
  updateUser: User;
  uploadFile: File;
  uploadFolder: Scalars['String'];
};


export type MutationAddSharedUserToFolderArgs = {
  folderID: Scalars['String'];
  sharedUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationAddUserToFolderReadOnlyUsersArgs = {
  folderID: Scalars['String'];
  readOnlyUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationAddUsersToReadonlyFileArgs = {
  fileID: Scalars['String'];
  readonlyUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationAddUsersToSharedUserFileArgs = {
  fileID: Scalars['String'];
  sharedUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationChangeUserRoleInFileArgs = {
  fileID: Scalars['String'];
  targetRole: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationChangeUserRoleInFolderArgs = {
  folderID: Scalars['String'];
  targetRole: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationConnectComputerArgs = {
  input: ConnectComputerInput;
};


export type MutationCreateCheckoutSessionArgs = {
  packageId: Scalars['Float'];
};


export type MutationCreateFolderArgs = {
  input: NewFolderInput;
};


export type MutationDeleteFileArgs = {
  fileID: Scalars['String'];
};


export type MutationDeleteFolderArgs = {
  folderID: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMakeCopyOfFileArgs = {
  fileID: Scalars['String'];
};


export type MutationMakeCopyOfFolderArgs = {
  folderID: Scalars['String'];
};


export type MutationMoveFileToNewFolderArgs = {
  fileID: Scalars['String'];
  targetFolderID: Scalars['String'];
};


export type MutationMoveFileToTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationMoveFolderArgs = {
  folderID: Scalars['String'];
  targetFolderID: Scalars['String'];
};


export type MutationMoveFolderOutOfTrashArgs = {
  folderID: Scalars['String'];
};


export type MutationMoveFolderToTrashArgs = {
  folderID: Scalars['String'];
};


export type MutationRemoveUserFromFileArgs = {
  fileID: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationRemoveUserFromFolderArgs = {
  folderID: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationRenameFileArgs = {
  fileID: Scalars['String'];
  newName: Scalars['String'];
};


export type MutationRenameFolderArgs = {
  folderID: Scalars['String'];
  name: Scalars['String'];
};


export type MutationRestoreFileFromTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationSetGeneralAccessOfFileArgs = {
  fileID: Scalars['String'];
  isPublic: Scalars['Boolean'];
};


export type MutationSetGeneralFolderAccessArgs = {
  folderID: Scalars['String'];
  isPublic: Scalars['Boolean'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationStarFileArgs = {
  fileID: Scalars['String'];
};


export type MutationStarFolderArgs = {
  folderID: Scalars['String'];
};


export type MutationUnstarFileArgs = {
  fileID: Scalars['String'];
};


export type MutationUnstarFolderArgs = {
  folderID: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserPayload;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  folderID: Scalars['String'];
};


export type MutationUploadFolderArgs = {
  input: UploadFolderInput;
};

export type NewFolderInput = {
  name: Scalars['String'];
  rootFolderID?: InputMaybe<Scalars['String']>;
};

export type NewUserReturn = {
  accessToken: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Package = {
  ID: Scalars['Float'];
  detail: Scalars['String'];
  maxStorage: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type PeopleWithAccessResponse = {
  isPublic: Scalars['Boolean'];
  owner: User;
  readonlyUsers: Array<User>;
  sharedUsers: Array<User>;
};

export type Query = {
  getAllPackages: Array<Package>;
  getAllUserFoldersPagination: GetFoldersByOwnerIdPaginationResponse;
  getAllUsers: Array<User>;
  getArrayOfRootFoldersName: Array<Folder>;
  getComputerByMacAddress: Computer;
  getFileByID: File;
  getFileByIDWithAccess: File;
  getFileDetail: File;
  getFilesByFolder: Array<File>;
  getFolderDetail: Folder;
  getFoldersOfFolder: Array<Folder>;
  getMe: User;
  getPeopleWithAccessToFile: PeopleWithAccessResponse;
  getPeopleWithAccessToFolder: PeopleWithAccessResponse;
  getStarredFiles: Array<File>;
  getStarredFolders: Array<Folder>;
  getUserByID: User;
  getUserFiles: Array<File>;
  getUserSharedFiles: Array<File>;
  getUserSharedFolders: Array<Folder>;
  getUserTrashFiles: Array<File>;
  getUserTrashFolder: Array<Folder>;
  getUsersBySearchPagination: UserSearchPaginationResponse;
  searchFilesAndFolders: SearchFilesAndFoldersResponse;
};


export type QueryGetAllUserFoldersPaginationArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
  search: Scalars['String'];
};


export type QueryGetArrayOfRootFoldersNameArgs = {
  folderID: Scalars['String'];
};


export type QueryGetComputerByMacAddressArgs = {
  macAddress: Scalars['String'];
};


export type QueryGetFileByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetFileByIdWithAccessArgs = {
  fileID: Scalars['String'];
};


export type QueryGetFileDetailArgs = {
  fileID: Scalars['String'];
};


export type QueryGetFilesByFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetFolderDetailArgs = {
  folderID: Scalars['String'];
};


export type QueryGetFoldersOfFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetPeopleWithAccessToFileArgs = {
  fileID: Scalars['String'];
};


export type QueryGetPeopleWithAccessToFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetUsersBySearchPaginationArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
  search: Scalars['String'];
};


export type QuerySearchFilesAndFoldersArgs = {
  search: Scalars['String'];
};

export type SearchFilesAndFoldersResponse = {
  files?: Maybe<Array<File>>;
  folders?: Maybe<Array<Folder>>;
};

export type UpdateUserPayload = {
  avatar: Scalars['String'];
  name: Scalars['String'];
};

export type UploadFolder = {
  files?: InputMaybe<Array<Scalars['Upload']>>;
  folders?: InputMaybe<Array<UploadFolder>>;
  name: Scalars['String'];
};

export type UploadFolderInput = {
  folder: UploadFolder;
  rootFolderID: Scalars['String'];
};

export type User = {
  ID: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  computers?: Maybe<Array<Computer>>;
  currentPackage: Package;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  rootFolder?: Maybe<Folder>;
  storageUsed: Scalars['Float'];
  stripeCustomerID: Scalars['String'];
};

export type UserSearchPaginationResponse = {
  hasMore: Scalars['Boolean'];
  results: Array<User>;
};


export const ConnectComputerDocument = gql`
    mutation connectComputer($input: ConnectComputerInput!) {
  connectComputer(input: $input) {
    ID
    macAddress
    hostname
    storagePath
  }
}
    `;
export type ConnectComputerMutationFn = Apollo.MutationFunction<ConnectComputerMutation, ConnectComputerMutationVariables>;

/**
 * __useConnectComputerMutation__
 *
 * To run a mutation, you first call `useConnectComputerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectComputerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectComputerMutation, { data, loading, error }] = useConnectComputerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectComputerMutation(baseOptions?: Apollo.MutationHookOptions<ConnectComputerMutation, ConnectComputerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectComputerMutation, ConnectComputerMutationVariables>(ConnectComputerDocument, options);
      }
export type ConnectComputerMutationHookResult = ReturnType<typeof useConnectComputerMutation>;
export type ConnectComputerMutationResult = Apollo.MutationResult<ConnectComputerMutation>;
export type ConnectComputerMutationOptions = Apollo.BaseMutationOptions<ConnectComputerMutation, ConnectComputerMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetComputerByMacAddressDocument = gql`
    query getComputerByMacAddress($macAddress: String!) {
  getComputerByMacAddress(macAddress: $macAddress) {
    ID
    macAddress
    name
    hostname
    storagePath
  }
}
    `;

/**
 * __useGetComputerByMacAddressQuery__
 *
 * To run a query within a React component, call `useGetComputerByMacAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComputerByMacAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComputerByMacAddressQuery({
 *   variables: {
 *      macAddress: // value for 'macAddress'
 *   },
 * });
 */
export function useGetComputerByMacAddressQuery(baseOptions: Apollo.QueryHookOptions<GetComputerByMacAddressQuery, GetComputerByMacAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComputerByMacAddressQuery, GetComputerByMacAddressQueryVariables>(GetComputerByMacAddressDocument, options);
      }
export function useGetComputerByMacAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComputerByMacAddressQuery, GetComputerByMacAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComputerByMacAddressQuery, GetComputerByMacAddressQueryVariables>(GetComputerByMacAddressDocument, options);
        }
export type GetComputerByMacAddressQueryHookResult = ReturnType<typeof useGetComputerByMacAddressQuery>;
export type GetComputerByMacAddressLazyQueryHookResult = ReturnType<typeof useGetComputerByMacAddressLazyQuery>;
export type GetComputerByMacAddressQueryResult = Apollo.QueryResult<GetComputerByMacAddressQuery, GetComputerByMacAddressQueryVariables>;
export function refetchGetComputerByMacAddressQuery(variables: GetComputerByMacAddressQueryVariables) {
      return { query: GetComputerByMacAddressDocument, variables: variables }
    }
export const GetFilesByFolderDocument = gql`
    query getFilesByFolder($folderID: String!) {
  getFilesByFolder(folderID: $folderID) {
    ID
    name
    url
    fileType
    isTrash
  }
}
    `;

/**
 * __useGetFilesByFolderQuery__
 *
 * To run a query within a React component, call `useGetFilesByFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesByFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesByFolderQuery({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useGetFilesByFolderQuery(baseOptions: Apollo.QueryHookOptions<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>(GetFilesByFolderDocument, options);
      }
export function useGetFilesByFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>(GetFilesByFolderDocument, options);
        }
export type GetFilesByFolderQueryHookResult = ReturnType<typeof useGetFilesByFolderQuery>;
export type GetFilesByFolderLazyQueryHookResult = ReturnType<typeof useGetFilesByFolderLazyQuery>;
export type GetFilesByFolderQueryResult = Apollo.QueryResult<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>;
export function refetchGetFilesByFolderQuery(variables: GetFilesByFolderQueryVariables) {
      return { query: GetFilesByFolderDocument, variables: variables }
    }
export const GetMeDocument = gql`
    query getMe {
  getMe {
    ID
    name
    email
    rootFolder {
      ID
    }
    avatar
    storageUsed
    currentPackage {
      ID
      maxStorage
      name
      detail
    }
    stripeCustomerID
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export function refetchGetMeQuery(variables?: GetMeQueryVariables) {
      return { query: GetMeDocument, variables: variables }
    }
export type ConnectComputerMutationVariables = Exact<{
  input: ConnectComputerInput;
}>;


export type ConnectComputerMutation = { connectComputer: { ID: string, macAddress: string, hostname: string, storagePath: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: string };

export type GetComputerByMacAddressQueryVariables = Exact<{
  macAddress: Scalars['String'];
}>;


export type GetComputerByMacAddressQuery = { getComputerByMacAddress: { ID: string, macAddress: string, name: string, hostname: string, storagePath: string } };

export type GetFilesByFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetFilesByFolderQuery = { getFilesByFolder: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { ID: string, name: string, email: string, avatar?: string | null, storageUsed: number, stripeCustomerID: string, rootFolder?: { ID: string } | null, currentPackage: { ID: number, maxStorage: number, name: string, detail: string } } };
