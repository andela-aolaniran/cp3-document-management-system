import httpRequester from 'superagent';
import * as ActionTypes from './ActionTypes';

export function setDocuments(documents) {
  return {
    type: ActionTypes.SET_ALL_DOCUMENTS,
    documents
  };
}

export function setFetchingDocuments(isFetching) {
  return {
    type: ActionTypes.FETCHING_DOCUMENTS,
    isFetching
  };
}

export function fetchDocumentsAsync(userToken) {
  return (dispatch) => {
    dispatch(setFetchingDocuments(true));
    httpRequester.get('/api/documents')
    .set({ 'x-access-token': userToken })
    .end((error, response) => {
      dispatch(setFetchingDocuments(false));
      if (response.status === 200) {
        dispatch(setDocuments(response.body));
      } else {
        console.log('Could not fetch documents: ', response.body)
      }
    });
  }
}

export function deleteDocumentsAsync(userToken, docId) {
  return (dispatch) => {
    dispatch(setFetchingDocuments(true));
    httpRequester.delete(`/api/documents/${docId}`)
    .set({ 'x-access-token': userToken })
    .end((error, response) => {
      dispatch(setFetchingDocuments(false));
      if (response.status === 200) {
        fetchDocumentsAsync(userToken);
      } else {
        console.log('Could not fetch documents: ', response.body)
      }
    });
  }
}

export function updateDocumentAsync(userToken, docFields, docId) {
  return (dispatch) => {
    dispatch(setFetchingDocuments(true));
    httpRequester.put(`/api/documents/${docId}`)
    .set({ 'x-access-token': userToken })
    .send(docFields)
    .end((error, response) => {
      dispatch(setFetchingDocuments(false));
      if (response.status === 200) {
        fetchDocumentsAsync(userToken);
      } else {
        console.log('Could not fetch documents: ', response.body)
      }
    });
  }
}
