import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from '../../util/common';
import { deleteEducation } from '../../state/actions/profileAction';
class Education extends Component {
    onDeleteClick(id){
        debugger; 
        this.props.deleteEducation(id)
    };
    render() {
        const formatDate = (date) => {
            return isEmpty(date) ? 'Now' : moment(date).format('LL');
        };
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>{formatDate(edu.from)} - {formatDate(edu.to)}</td>
                <td onClick={this.onDeleteClick.bind(this, edu._id)}><i class="fa fa-trash delete-icons" aria-hidden="true"></i></td>
            </tr>
        ))
        return (
            <div>
                <h4 className='mb-4'>Education Credentials</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field Of Study</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    {education}
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation})(Education);