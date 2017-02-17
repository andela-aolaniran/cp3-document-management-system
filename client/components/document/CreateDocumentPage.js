import React from 'react';

/**
 * Custom react component class for creating documents
 */
class CreateDocumentPage extends React.Component {

  /**
   * Method to render a create document CreateDocumentPage
   * @return{Object} - Element to be rendered
   */
  render() {
    return (
      <div className='row'>
        <form className='col s12 m8 offset-m2'>
          <div className='row'>
            <br/>
            <h5 className='indigo-text left-align'>New Document</h5>
            <br/>
            <div class='row col s12'>
            <div className='input-field col s9'>
              <input id='document_title' type='text'/>
              <label htmlFor='document_title' className='active'>Title</label>
            </div>
            <div class="input-field col s3">
              <select>
                <option value="1">Public</option>
                <option value="2">Private</option>
                <option value="3">Role</option>
              </select>
              <label>Document Access</label>
            </div>
          </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <textarea id='document_content' className='materialize-textarea' ></textarea>
              <label htmlFor='document_content' className='active'>Content</label>
            </div>
          </div>
          <div className='row'>
            <button type='submit'
              name='btn_login' 
              className='col s12 m6 offset-m3 btn btn-large waves-effect indigo'>
              Create Document</button>
          </div>
          <br/>
        </form>
      </div>
    );
  }
}

export default CreateDocumentPage;
