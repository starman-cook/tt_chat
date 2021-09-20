Feature: Users exchange messages

  Scenario: User one sends a message to user two

    Given user "one" logged in in browser "one"
    Given user "two" logged in in browser "two"

    When user "one" sends a "Hello!" to user "two"
    Then user "one" sees "Hello!" on the "right side" in the message window
    And user "two" sees "Hello!" on the "left side" in the message window