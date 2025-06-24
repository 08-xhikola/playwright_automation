Feature: Shift Management

Scenario: Create and verify shift via API
  Given I navigate to the Shifts section
  When I create a new shift with title "Late Shift" from "11:00" to "19:00"
  And I select duration "Spät-Schicht"
  And I assign employee "Artur Gjonaj" and save shift from "11:00" to "19:00" with duration "Spät-Schicht"
  Then the shift from "11:00" to "19:00" with duration "Spät-Schicht" should be visible
Then the shift from "11:00" to "19:00" with duration "Spät-Schicht" should exist in the UI

  Scenario: Update the shift
    Given I navigate to the Shifts section
    When I update the shift from "11:00" to "19:00" with duration "Spät-Schicht" to title "Updated Shift"
    Then the shift from "11:00" to "19:00" with duration "Updated Shift" should be visible

  Scenario: Delete the shift
  Given I navigate to the Shifts section
  When I delete the shift from "11:00" to "19:00" with duration "Updated Shift"
Then the shift from "11:00" to "19:00" with duration "Updated Shift" should not exist in the UI

Scenario: Show error when creating a shift without a title
  Given I navigate to the Shifts section
  When I create a new shift with title "" from "11:00" to "19:00"
  And I select duration "Spät-Schicht"
  And I assign employee "Artur Gjonaj" and try to save shift from "11:00" to "19:00" with duration "Spät-Schicht"
  Then an error message "Mindestens eine Resource auswählen." should be visible
