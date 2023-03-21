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
  Upload: any;
};

export type File = {
  ID: Scalars['String'];
  fileType: Scalars['String'];
  folder?: Maybe<Folder>;
  isTrash: Scalars['Boolean'];
  name: Scalars['String'];
  ownerID: Scalars['String'];
  url: Scalars['String'];
};

export type Folder = {
  ID: Scalars['String'];
  files?: Maybe<Array<File>>;
  isTrash: Scalars['Boolean'];
  name: Scalars['String'];
  ownerID: Scalars['String'];
  path: Scalars['String'];
  rootFolder?: Maybe<Folder>;
  subFolders?: Maybe<Array<Folder>>;
};

export type Mutation = {
  createFolder: Folder;
  deleteFile: Scalars['String'];
  deleteFolder: Scalars['String'];
  login: Scalars['String'];
  moveFileToTrash: File;
  moveFolderOutOfTrash: Scalars['String'];
  moveFolderToTrash: Scalars['String'];
  restoreFileFromTrash: File;
  signup: NewUserReturn;
  uploadFile: File;
  uploadFolder: Scalars['String'];
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


export type MutationMoveFileToTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationMoveFolderOutOfTrashArgs = {
  folderID: Scalars['String'];
};


export type MutationMoveFolderToTrashArgs = {
  folderID: Scalars['String'];
};


export type MutationRestoreFileFromTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
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

export type Query = {
  getAllUsers: Array<User>;
  getArrayOfRootFoldersName: Array<Folder>;
  getFileByID: File;
  getFilesByFolder: Array<File>;
  getMe: User;
  getUserByID: User;
  getUserFiles: Array<File>;
  getUserFolders: Array<Folder>;
  getUserTrashFiles: Array<File>;
  getUserTrashFolder: Array<Folder>;
};


export type QueryGetArrayOfRootFoldersNameArgs = {
  folderID: Scalars['String'];
};


export type QueryGetFileByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetFilesByFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetUserFoldersArgs = {
  folderID: Scalars['String'];
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
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  rootFolder: Folder;
};


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
export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: string };

export type GetFilesByFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetFilesByFolderQuery = { getFilesByFolder: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };
