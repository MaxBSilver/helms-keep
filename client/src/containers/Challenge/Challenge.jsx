import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editQuest } from '../../actions';

export class Challenge extends Component {

	handleUpdate = e => {
    const challenge = { ...this.props.data };

    if (e.target.classList.contains('checkbox')) {
      challenge.isCompleted = !challenge.isCompleted;
      this.sendChalUpdate(challenge);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      challenge.message = e.target.innerText;
      this.sendChalUpdate(challenge);
      e.target.blur();
    } else if (e.type === 'blur') {
      challenge.message = e.target.innerText;
      this.sendChalUpdate(challenge);
    }
  };
  
  sendChalUpdate = challenge => {
    this.props.viewType !== 'list' ? this.props.editChallenge(challenge)
      : this.props.updateChallenge(challenge);
  }

	handleDelete = () => {
    const { id } = this.props.data;
    const { viewType } = this.props;

		if (viewType === 'new' || viewType === 'edit') {
			this.props.removeChallenge(id);
		} else {
			this.props.deleteChallenge(id);
		}
	};

  render() {
		let boxClass = this.props.data.isCompleted ? 'checkbox fa-check-square' : 'checkbox fa-square';
    let box = this.props.viewType !== 'new'
      ? (
				<i className={`far ${boxClass}`} id={this.props.id} onClick={this.handleUpdate} />
      )
      : null;

		return (
			<li className="challenge-txt" key={this.props.data.id}>
				{box}
				<span
					contentEditable="true"
					id={this.props.id}
					className="message"
					suppressContentEditableWarning={true}
					onKeyDown={this.handleUpdate}
					onBlur={this.handleUpdate}>
					{this.props.data.message}
				</span>
				<p role="button" name={this.props.data.id} className="close-icon" onClick={this.handleDelete}>
					x
				</p>
			</li>
		);
	}
}

export const mapStateToProps = state => ({
	quests: state.quests
});

export const mapDispatchToProps = dispatch => ({
	updateQuest: quest => dispatch(editQuest(quest))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);