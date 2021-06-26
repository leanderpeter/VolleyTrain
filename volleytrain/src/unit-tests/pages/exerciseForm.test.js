import { render, screen, fireEvent} from '@testing-library/react';
import ExerciseForm from '../../components/pages/exerciseForm';
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

test('Textfields can be edited correctly', () => {

  // Arrange
  render(<ExerciseForm />);
  const name = screen.getByLabelText("Übungsname")
  const goal = screen.getByLabelText("Übungsziel")
  const duration = screen.getByLabelText("Übungsdauer in Minuten")
  const description = screen.getByLabelText("Beschreibung")
  const notes = screen.getByLabelText("Notizen")

  // Act
  fireEvent.change(name , {target:{value:"test-name"}})
  fireEvent.change(goal , {target:{value:"test-goal"}})
  fireEvent.change(duration , {target:{value:"test-duration"}})
  fireEvent.change(description , {target:{value:"test-description"}})
  fireEvent.change(notes , {target:{value:"test-notes"}})

  //Assert
  expect(name.value).toBe("test-name")
  expect(goal.value).toBe("test-goal")
  expect(duration.value).toBe("test-duration")
  expect(description.value).toBe("test-description")
  expect(notes.value).toBe("test-notes")

});
