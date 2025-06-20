Feature: Manage shifts under Capacity Planning

  Scenario: Create a shift with duration and employee
    Given I navigate to the Shifts section
    When I create a new shift with title "Late Shift" from "11:00" to "19:00"
    And I select duration "Spät-Schicht"
    And I assign employee "Artur Gjonaj" and save shift from "11:00" to "19:00" with duration "Spät-Schicht"
    Then the shift from "11:00" to "19:00" with duration "Spät-Schicht" should be visible

  Scenario: Update the shift
    Given I navigate to the Shifts section
    When I update the shift from "11:00" to "19:00" with duration "Spät-Schicht" to title "Updated Shift"
    Then the shift from "11:00" to "19:00" with duration "Spät-Schicht" should be visible

  Scenario: Delete the shift
    Given I navigate to the Shifts section
    When I delete the shift from "11:00" to "19:00" with duration "Spät-Schicht"
    Then the shift from "11:00" to "19:00" with duration "Spät-Schicht" should not be visible
