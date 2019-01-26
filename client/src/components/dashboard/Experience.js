import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from '../../util/common';
import { deleteExperience } from '../../state/actions/profileAction';
class Experience extends Component {
    onDeleteClick(id){
        debugger; 
        this.props.deleteExperience(id)
    };
    render() {
        const formatDate = (date) => {
            return isEmpty(date) ? 'Now' : moment(date).format('LL');
        };
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{formatDate(exp.from)} - {formatDate(exp.to)}</td>
                <td onClick={this.onDeleteClick.bind(this, exp._id)}><i class="fa fa-trash delete-icons" aria-hidden="true"></i></td>
            </tr>
        ))
        return (
            <div>
                <h4 className='mb-4'>Experience Credentials</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    {experience}
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience})(Experience);